import { useEditor, EditorContent, Editor } from '@tiptap/react'
import { useEffect } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'

import { BiBold } from "react-icons/bi";
import { FiItalic, FiUnderline } from "react-icons/fi";
import { GoLink } from "react-icons/go";
import { MdOutlineFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
import { IoCodeSlashOutline } from "react-icons/io5";
import { BsBlockquoteLeft } from "react-icons/bs";

interface EditorProps {
    onContentChange: (content: string) => void;
    preValue?: string;
}

interface ToolbarProps {
    editor: Editor | null;
}

const extensions = [
    StarterKit,
    Underline,
    Link.configure({
        openOnClick: false,
        HTMLAttributes: {
            class: 'my-custom-link-class',
        },
    }),
]

export default function EditorComponent({
    onContentChange,
    preValue = '<p>Hello world!</p>',
}: EditorProps) {

    const editor = useEditor({
        extensions,
        content: preValue,
        onUpdate: ({ editor }) => {
            onContentChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (!editor) return

        const current = editor.getHTML()
        if (current !== preValue) {
            editor.commands.setContent(preValue, { emitUpdate: false })
        }
    }, [editor, preValue])

    return (
        <div className="editor-wrapper border border-gray-100 min-h-80">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

function Toolbar({ editor }: ToolbarProps) {
    if (!editor) return null

    const addLink = () => {
        const previousUrl = editor.getAttributes('link').href as string | undefined
        let url = window.prompt('URL', previousUrl)

        if (url === null) return

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        if (!/^https?:\/\//i.test(url) && !url.startsWith('//')) {
            url = `https://${url}`
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    return (
        <div className="toolbar">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <BiBold />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <FiItalic />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
            >
                <FiUnderline />
            </button>

            <button
                type="button"
                onClick={addLink}
                className={editor.isActive('link') ? 'is-active' : ''}
            >
                <GoLink />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <MdOutlineFormatListBulleted />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <MdFormatListNumbered />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
                <IoCodeSlashOutline />
            </button>

            {[1, 2, 3, 4].map((level) => (
                <button
                    key={level}
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()}
                    className={editor.isActive('heading', { level }) ? 'is-active' : ''}
                >
                    {`H${level}`}
                </button>
            ))}

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                <BsBlockquoteLeft />
            </button>
        </div>
    )
}