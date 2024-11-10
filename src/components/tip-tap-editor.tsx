import { Editor, EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapMenu from './tiptap-editor/tip-tap-menu.tsx';
import { Control, Controller } from 'react-hook-form';

const extensions = [StarterKit];

export default function TipTapEditor({
  value,
  controlName,
  classNames,
  control,
}: {
  value: string;
  controlName: string;
  control: Control;
  classNames?: string;
}) {
  return (
    <Controller
      name={controlName}
      control={control}
      defaultValue={value}
      render={({ field: { onChange } }) => (
        <EditorProvider
          slotBefore={<TipTapMenu />}
          extensions={extensions}
          content={value}
          editorProps={{ attributes: { class: classNames + ' tiptap-editor' } }}
          onUpdate={({ editor }: { editor: Editor }) => {
            onChange(editor.getHTML());
          }}></EditorProvider>
      )}
    />
  );
}
