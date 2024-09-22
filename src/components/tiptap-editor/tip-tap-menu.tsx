import { useCurrentEditor } from '@tiptap/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TipTapMenu() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-row flex-wrap w-full gap-1 p-1 border-b border-secondary-50">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive('bold') ? 'active font-bold btn btn-sm' : 'font-bold btn btn-sm'
        }>
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'active btn btn-sm italic' : 'btn btn-sm italic'}>
        I
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'active btn btn-sm' : 'btn btn-sm'}>
        P
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'active btn btn-sm' : 'btn btn-sm'}>
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'active btn btn-sm' : 'btn btn-sm'}>
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'active btn btn-sm' : 'btn btn-sm'}>
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'active btn btn-sm' : 'btn btn-sm'}>
        H4
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'active btn btn-sm' : 'btn btn-sm'}>
        <FontAwesomeIcon icon="list-ul"></FontAwesomeIcon>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'active btn btn-sm' : 'btn btn-sm'}>
        <FontAwesomeIcon icon="list-ol"></FontAwesomeIcon>
      </button>
      <button
        type="button"
        className="btn btn-sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}>
        <FontAwesomeIcon icon="rotate-left"></FontAwesomeIcon>
      </button>
      <button
        type="button"
        className="btn btn-sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}>
        <FontAwesomeIcon icon="rotate-right"></FontAwesomeIcon>
      </button>
    </div>
  );
}
