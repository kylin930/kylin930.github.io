document.getElementById('uploadForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData();
        const pathInput = document.getElementById('path');
        const filesInput = document.getElementById('files');
        if (pathInput.value.trim()) {
            formData.append('path', pathInput.value.trim());
        }
        for (let file of filesInput.files) {
            formData.append('files', file);
        }

        // FetchAPI发送请求
        fetch('cubyup.devlab.icu/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.status === 'success') {
                resultDiv.innerHTML = `
                    <p><strong>状态：</strong> 成功</p>
                    <p><strong>消息：</strong> ${data.message}</p>
                    <p><strong>上传的文件：</strong> ${data.uploaded_files.join(', ')}</p>
                    <p><strong>存储路径：</strong> ${data.storage_path}</p>
                `;
            } else {
                resultDiv.innerHTML = `
                    <p><strong>错误：</strong> ${data.message}</p>
                `;
            }
        })
        .catch(error => {
            console.error('上传失败:', error);
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `
                <p>上传失败，请稍后重试</p>
            `;
        });
    });
