document.getElementById('uploadForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData();
            const pathInput = document.getElementById('path');
            const filesInput = document.getElementById('files');
            if (pathInput.value.trim()) {
                formData.append('path', pathInput.value.trim());
            }
            let totalSize = 0;
            for (let file of filesInput.files) {
                totalSize += file.size;
                formData.append('files', file);
            }
            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', function (event) {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    const progressBar = document.getElementById('progressBar');
                    progressBar.style.width = percentComplete + '%';
                    const bytesInfo = document.getElementById('bytesInfo');
                    bytesInfo.textContent = `已传输：${formatBytes(event.loaded)} / 总大小：${formatBytes(event.total)}`;
                }
            });

            xhr.addEventListener('load', function () {
                const resultDiv = document.getElementById('result');
                const response = JSON.parse(xhr.responseText);

                if (xhr.status === 200 && response.status === 'success') {
                    resultDiv.innerHTML = `
                        <p><strong>状态：</strong> 成功</p>
                        <p><strong>消息：</strong> ${response.message}</p>
                        <p><strong>上传的文件：</strong> ${response.uploaded_files.join(', ')}</p>
                        <p><strong>存储路径：</strong><a href="https://cubylist.devlab.icu/listdir?path=${response.storage_path}"> ${response.storage_path}</a></p>
                    `;
                } else {
                    resultDiv.innerHTML = `
                        <p style="color: red;"><strong>错误：</strong> ${response.message}</p>
                    `;
                }
            });
            xhr.addEventListener('error', function () {
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = `
                    <p style="color: red;">上传失败，请稍后重试。</p>
                `;
            });
            xhr.open('POST', 'https://cubyup.devlab.icu/upload', true);
            xhr.send(formData);
        });

        function formatBytes(bytes) {
            if (bytes === 0) return '0 Byte';
            const k = 1024;
            const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
