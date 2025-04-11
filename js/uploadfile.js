// 显示路径提示框
function showPathAlert(path) {
    if (path) {
        mdui.alert(`您选择了保存路径：<code>${path}</code>`, '提示');
    } else {
        mdui.alert('将使用默认路径（按日期）保存文件', '提示');
    }
}

// 文件上传逻辑
function uploadFiles() {
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    const progressBar = document.getElementById('progress');
    const status = document.getElementById('status');
    const progressBarContainer = document.getElementById('progressBar');

    // 显示进度条
    progressBarContainer.style.display = 'block';
    status.textContent = '正在上传...';

    xhr.open('POST', '/upload', true);

    // 监听上传进度
    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            progressBar.style.width = percentComplete + '%';
            status.textContent = `已上传 ${Math.round(percentComplete)}%`;
        }
    };

    // 上传完成
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            status.textContent = response.message || '上传完成！';
        } else {
            status.textContent = '上传失败！';
        }
    };

    // 上传错误
    xhr.onerror = function() {
        status.textContent = '上传出错，请重试！';
    };

    // 发送请求
    xhr.send(formData);
}
