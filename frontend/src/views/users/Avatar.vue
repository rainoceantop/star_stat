<template>
  <div class="avatar">
    <div class="avatar_box">
      <div class="title">
        <h3>
          <font-awesome-icon :icon="titleIcon" class="fa_icon_big" />
          <span>请修改头像地址</span>
        </h3>
      </div>
      <div>
        <a-upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          :fileList="fileList"
          @preview="handlePreview"
          @change="handleChange"
          :beforeUpload="beforeUpload"
        >
          <div v-if="fileList.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
      <div class="from_box">
        <a-button type="primary" @click="updateAvatar()">确定上传</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "EditAcatar",
  data() {
    return {
      titleIcon: faImage,
      previewVisible: false,
      previewImage: "",
      fileList: []
    };
  },
  created() {},
  components: {
    FontAwesomeIcon
  },
  methods: {
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    updateAvatar() {
      const avatar = this.avatar;
      if (avatar) {
        let img = new Image();
        img.src = avatar;
        const user = { avatar: avatar };
        img.onload = () => {
          this.$store.dispatch("updateUser", user);
        };
        img.onerror = () => {
          alert("上传失败");
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
.avatar {
  &_box {
    display: grid;
    .title {
      font-size: 24px;
      font-weight: bold;
      h3 {
        display: flex;
        align-items: center;
      }
    }
    .from_box {
      //   display: flex;
      padding: 8px 0px;
      //   align-items: center;
      label {
        text-align: right;
        min-width: 80px;
      }
    }
  }
}
</style>