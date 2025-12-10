import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Bold,
	Essentials,
	Italic,
	Mention,
	Paragraph,
	Undo,
	Heading,
	Link,
	List,
	BlockQuote,
	Indent,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	ImageResize,
	LinkImage,
	SimpleUploadAdapter,
	Table,
	TableToolbar,
	MediaEmbed,
	Font,
	Alignment,
	HorizontalLine,
	RemoveFormat,
	Code,
	CodeBlock,
	Highlight,
	Strikethrough,
	Subscript,
	Superscript,
	Underline
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

const RichTextEditor = ({ value, onChange }) => {
	const editorConfig = {
		toolbar: {
			items: [
				'undo', 'redo',
				'|',
				'heading',
				'|',
				'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
				'|',
				'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code',
				'|',
				'link', 'uploadImage', 'insertTable', 'mediaEmbed', 'blockQuote', 'codeBlock', 'horizontalLine',
				'|',
				'alignment',
				'|',
				'bulletedList', 'numberedList', 'outdent', 'indent',
				'|',
				'highlight', 'removeFormat'
			],
			shouldNotGroupWhenFull: true
		},
		plugins: [
			Essentials,
			Bold,
			Italic,
			Underline,
			Strikethrough,
			Subscript,
			Superscript,
			Code,
			Paragraph,
			Heading,
			Link,
			List,
			BlockQuote,
			Indent,
			Image,
			ImageCaption,
			ImageStyle,
			ImageToolbar,
			ImageUpload,
			ImageResize,
			LinkImage,
			SimpleUploadAdapter,
			Table,
			TableToolbar,
			MediaEmbed,
			Font,
			Alignment,
			HorizontalLine,
			RemoveFormat,
			CodeBlock,
			Highlight,
			Mention,
			Undo
		],
		heading: {
			options: [
				{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
				{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
				{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
				{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
				{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
			]
		},
		image: {
			toolbar: [
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side',
				'|',
				'toggleImageCaption',
				'imageTextAlternative',
				'|',
				'linkImage'
			],
			resizeOptions: [
				{
					name: 'resizeImage:original',
					label: 'Original',
					value: null
				},
				{
					name: 'resizeImage:50',
					label: '50%',
					value: '50'
				},
				{
					name: 'resizeImage:75',
					label: '75%',
					value: '75'
				}
			]
		},
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
		},
		simpleUpload: {
			uploadUrl: 'http://localhost:5000/api/upload',
			withCredentials: false,
			headers: {
				// Add authorization header if needed
				// 'Authorization': 'Bearer <token>'
			}
		},
		fontSize: {
			options: [9, 11, 13, 'default', 17, 19, 21, 24, 28, 32, 36],
			supportAllValues: true
		},
		fontFamily: {
			options: [
				'default',
				'Arial, Helvetica, sans-serif',
				'Courier New, Courier, monospace',
				'Georgia, serif',
				'Lucida Sans Unicode, Lucida Grande, sans-serif',
				'Tahoma, Geneva, sans-serif',
				'Times New Roman, Times, serif',
				'Trebuchet MS, Helvetica, sans-serif',
				'Verdana, Geneva, sans-serif'
			],
			supportAllValues: true
		},
		fontColor: {
			columns: 6,
			documentColors: 10
		},
		fontBackgroundColor: {
			columns: 6,
			documentColors: 10
		},
		mention: {
			// Mention configuration (optional)
		}
	};

	return (
		<div style={{ minHeight: 300 }}>
			<CKEditor
				editor={ClassicEditor}
				data={value}
				config={editorConfig}
				onChange={(event, editor) => {
					const data = editor.getData();
					if (onChange) onChange(data);
				}}
			/>
		</div>
	);
};

export default RichTextEditor;
