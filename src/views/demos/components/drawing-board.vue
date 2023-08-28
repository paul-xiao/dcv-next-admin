<template>
  <div>
    <canvas
      ref="canvasRef"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
    ></canvas>
    <button @click="onSave">保存</button>
  </div>
</template>
<script lang="ts" setup>
  const canvasRef = ref();
  const context = ref();
  const isDrawing = ref(false);
  const lastX = ref();
  const lastY = ref();

  onMounted(() => {
    context.value = canvasRef.value.getContext('2d');
  });

  function startDrawing(event) {
    isDrawing.value = true;
    lastX.value = event.offsetX - canvasRef.value.getBoundingClientRect().left;
    lastY.value = event.offsetY - canvasRef.value.getBoundingClientRect().top;
  }
  function draw(event) {
    if (!isDrawing.value) return;
    const offsetX = event.offsetX - canvasRef.value.getBoundingClientRect().left;
    const offsetY = event.offsetY - canvasRef.value.getBoundingClientRect().top;
    context.value.beginPath();
    context.value.moveTo(lastX.value, lastY.value);
    context.value.lineTo(offsetX, offsetY);
    context.value.stroke();
    lastX.value = offsetX;
    lastY.value = offsetY;
  }
  function stopDrawing() {
    isDrawing.value = false;
  }

  function onSave() {
    const dataURL = canvasRef.value.toDataURL(); // 获取画布内容的数据URL
    const link = document.createElement('a');
    link.href = dataURL; // 设置链接的URL为数据URL
    link.download = 'canvas_image.png'; // 设置下载的文件名
    link.click(); // 触发下载
  }
</script>
<style lang="scss">
  canvas {
    width: 500px;
    height: 300px;
    border: 1px dashed;
  }
</style>
