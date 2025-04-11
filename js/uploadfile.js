document.getElementById('uploadForm').addEventListener('submit', function (e) {
        e.preventDefault(); // 阻止表单默认提交行为

        const formData = new FormData();
        const pathInput = document.getElementById('path');
        const filesInput = document.getElementById('files');

        // 添加自定义路径到 FormData
        if (pathInput.value.trim()) {
            formData.append('path', pathInput.value.trim());
        }

        // 添加文件到 FormData
        for (let file of filesInput.files) {
            formData.append('files', file);
        }

        // 使用 Fetch API 发送请求
        fetch('/upload', {
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
                    <p style="color: red;"><strong>错误：</strong> ${data.message}</p>
                `;
            }
        })
        .catch(error => {
            console.error('上传失败:', error);
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `
                <p style="color: red;">上传失败，请稍后重试。</p>
            `;
        });
    });
