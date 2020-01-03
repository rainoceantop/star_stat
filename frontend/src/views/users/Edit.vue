<template>
  <div class="wrapper">
    <div class="wrapper_layout primary_width">
      <div class="edituser">
        <div class="edituser_navbox">
          <ul>
            <li>
              <router-link :to="{name:'EditProfile'}">
                <font-awesome-icon :icon="proflieIcon" class="fa_icon_sma" />
                <span>个人信息</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'EditAvatar'}">
                <font-awesome-icon :icon="avatarIcon" class="fa_icon_sma" />
                <span>修改头像</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'EditPassword'}">
                <font-awesome-icon :icon="lockIcon" class="fa_icon_sma" />
                <span>修改密码</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="edituser_details">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faIdCard,
  faImage,
  faUserLock
} from "@fortawesome/free-solid-svg-icons";
export default {
  name: "EditUsers",
  data() {
    return {
      proflieIcon: faIdCard,
      avatarIcon: faImage,
      lockIcon: faUserLock
    };
  },
  props: ["uid"],
  components: {
    FontAwesomeIcon
  }
};
</script>

<style lang="less">
@media screen and (max-width: 640px) {
  .edituser {
    width: 100%;
    max-width: 640px;
    display: grid;
    gap: 20px;
    grid-template-columns: 100% !important;
    grid-template-areas:
      "a"
      "b";
    &_navbox {
      width: 90%;
      margin: 10px auto 10px auto;
    }
    &_details {
      width: 90%;
      margin: 10px auto 10px auto;
    }
  }
}
@media screen and (max-width: 360px) {
  .edituser {
    width: 100%;
    max-width: 360px;
    display: grid;
    gap: 20px;
    grid-template-columns: 100% !important;
    grid-template-areas:
      "a"
      "b";
    &_navbox {
      width: 90%;
      margin: 10px auto 10px auto;
    }
    &_details {
      width: 90%;
      margin: 10px auto 10px auto;
    }
  }
}
.wrapper {
  &_layout {
    padding: 20px 0px;
    .edituser {
      display: grid;
      gap: 20px;
      grid-template-columns: 20% 80%;
      justify-items: stretch;
      align-items: start;
      &_navbox {
        box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.3);
        background: white;
        text-align: center;
        ul {
          li {
            padding: 8px;
            font-size: 16px;
            line-height: 36px;
            a {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
      &_details {
        flex: 1;
        box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.3);
        background: white;
        padding: 20px;
      }
    }
  }
}
</style>