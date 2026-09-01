'use client';

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent SSR issues (document is not defined)
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor = forwardRef<any, RichTextEditorProps>(
  ({ value, onChange, placeholder }, ref) => {
    
    // Custom toolbar configuration
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
      ],
    };

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike',
      'list',
      'link'
    ];

    return (
      <div className="rich-text-editor-container font-sans">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="text-neutral-900"
        />
        <style jsx global>{`
          .rich-text-editor-container .ql-toolbar {
            background-color: #f9fafb;
            border: 1px solid #e5e5e5;
            border-top-left-radius: 0.75rem;
            border-top-right-radius: 0.75rem;
            font-family: inherit;
          }
          .rich-text-editor-container .ql-toolbar button,
          .rich-text-editor-container .ql-toolbar .ql-picker {
            color: #525252;
          }
          .rich-text-editor-container .ql-toolbar .ql-stroke {
            stroke: #525252;
          }
          .rich-text-editor-container .ql-toolbar .ql-fill {
            fill: #525252;
          }
          .rich-text-editor-container .ql-container {
            border: 1px solid #e5e5e5;
            border-top: none;
            border-bottom-left-radius: 0.75rem;
            border-bottom-right-radius: 0.75rem;
            min-height: 150px;
            font-family: inherit;
            font-size: 0.875rem;
            background-color: #ffffff;
          }
          .rich-text-editor-container .ql-editor {
            min-height: 150px;
          }
          .rich-text-editor-container .ql-editor.ql-blank::before {
            color: #a3a3a3;
            font-style: normal;
          }
        `}</style>
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';
