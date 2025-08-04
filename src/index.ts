import joplin from "api";
import { MenuItemLocation, ToolbarButtonLocation } from "api/types";

joplin.plugins.register({
  onStart: async function () {
    console.info("Note Rename Regex plugin started!");

    const prefixNoteNames = async (prefix: string) => {
      await renameRegexSelected((noteName: string) => {
        return prefix + noteName;
      });
    };

    const suffixNoteNames = async (suffix: string) => {
      await renameRegexSelected((noteName: string) => {
        return noteName + suffix;
      });
    };

    const searchAndReplaceNoteNames = async (
      search: string,
      replace: string,
    ) => {
      await renameRegexSelected((noteName: string) => {
        return noteName.replace(new RegExp(search, "g"), replace);
      });
    };

    const renameRegexSelected = async (renameRegexFn: (noteName: string) => string) => {
      const noteIds = await joplin.workspace.selectedNoteIds();
      const notes: any[] = [];
      for (let noteId of noteIds) {
        notes.push(
          await joplin.data.get(["notes", noteId], {
            fields: ["id", "title", "user_updated_time"],
          }),
        );
      }
      for (let note of notes) {
        // User-updated time is kept the same so that note order is not affected
        await joplin.data.put(["notes", note.id], null, {
          title: renameRegexFn(note.title),
          user_updated_time: note.user_updated_time,
        });
      }
    };

    const replaceHandle = await joplin.views.dialogs.create("noteNameReplaceRegex");
    await joplin.views.dialogs.setHtml(
      replaceHandle,
      `
		<h4>Note Rename Regex: Search and Replace Regular Expression</h4>
		<form name="replace">
			Search: <input type="text" name="search" style="margin-bottom: 1rem;" />
			Replace: <input type="text" name="replace" style="margin-bottom: 1rem;" />
		</form>
		`,
    );

    await joplin.commands.register({
      name: "noteNameReplaceRegex",
      label: "Search and Replace Regex",
      execute: async () => {
        console.info("Note Rename Regex: Executing replace regex command");
        const result = await joplin.views.dialogs.open(replaceHandle);
        if (result["id"] != "ok") {
          return;
        }
        const formData = result["formData"]["replace"];
        await searchAndReplaceNoteNames(
          formData["search"],
          formData["replace"],
        );
      },
    });

    await joplin.views.toolbarButtons.create(
      "noteRenameReplaceRegexButton",
      "noteNameReplaceRegex",
      ToolbarButtonLocation.NoteToolbar,
    );

    // FIXME: Creating a menu instead of a menuItem at NoteListContextMenu won't work and breaks toolbar buttons
    await joplin.views.menuItems.create(
      "noteRenameReplaceRegexContextItem",
      "noteNameReplaceRegex",
      MenuItemLocation.NoteListContextMenu,
    );

    const menuItems = [
      { commandName: "noteNameReplaceRegex" },
    ];
    await joplin.views.menus.create(
      "noteRenameRegexToolsMenu",
      "Note Rename Regex",
      menuItems,
    );
  },
});
