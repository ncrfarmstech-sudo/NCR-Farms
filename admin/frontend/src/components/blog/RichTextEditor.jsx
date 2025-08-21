import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const RichTextEditor = ({ value, onChange }) => {
	return (
		<div style={{ minHeight: 200 }}>
			<CKEditor
				editor={ClassicEditor}
				data={value}
				onChange={(event, editor) => {
					const data = editor.getData();
					if (onChange) onChange(data);
				}}
			/>
		</div>
	);
};

export default RichTextEditor;
