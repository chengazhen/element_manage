<template>
  <div class="editor">
    <div>
      <quill-editor
        :content="content"
        :options="editorOption"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>
    <div>
      <el-button type="success">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editorOption: {},
      content: ""
    };
  },
  methods: {
    onEditorChange(e) {
      console.log(e.text);
    },
    onEditorReady(quill) {  
      console.log("editor ready!", quill);
    }
  }
};
</script>
<style lang="scss" scoped>
.editor {
  width: 90%;
  margin: 0 auto;
  // margin-bottom: 40px;
  .quill-editor {
    height: 300px;
    margin-bottom: 80px;
  }
}
</style>