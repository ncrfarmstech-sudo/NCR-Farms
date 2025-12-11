import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Custom upload adapter for Cloudinary
class UploadAdapter {
	constructor(loader) {
		this.loader = loader;
	}

	upload() {
		return this.loader.file.then(
			(file) =>
				new Promise((resolve, reject) => {
					const formData = new FormData();
					formData.append('image', file);

					const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
					fetch(`${baseURL}/upload`, {
						method: 'POST',
						body: formData,
					})
						.then((response) => {
							if (!response.ok) {
								throw new Error(`HTTP error! status: ${response.status}`);
							}
							return response.json();
						})
						.then((result) => {
							if (result.url) {
								resolve({
									default: result.url,
								});
							} else {
								reject(result.message || 'Upload failed');
							}
						})
						.catch((error) => {
							console.error('Upload error:', error);
							reject(error.message || 'Upload failed');
						});
				})
		);
	}

	abort() {
		// Handle abort if needed
	}
}

function CustomUploadAdapterPlugin(editor) {
	editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
		return new UploadAdapter(loader);
	};
}

const RichTextEditor = ({ value, onChange }) => {
	const editorRef = React.useRef(null);

	React.useEffect(() => {
		if (editorRef.current && value !== undefined) {
			const currentData = editorRef.current.getData();
			if (currentData !== value) {
				editorRef.current.setData(value);
			}
		}
	}, [value]);

	return (
		<div style={{ minHeight: 200 }}>
			<CKEditor
				editor={ClassicEditor}
				data={value || ''}
				config={{
					extraPlugins: [CustomUploadAdapterPlugin],
					toolbar: [
						'heading',
						'|',
						'bold',
						'italic',
						'link',
						'bulletedList',
						'numberedList',
						'|',
						'imageUpload',
						'blockQuote',
						'insertTable',
						'mediaEmbed',
						'|',
						'undo',
						'redo',
					],
				}}
				onReady={(editor) => {
					editorRef.current = editor;
				}}
				onChange={(event, editor) => {
					const data = editor.getData();
					if (onChange) onChange(data);
				}}
			/>
		</div>
	);
};

export default RichTextEditor;
