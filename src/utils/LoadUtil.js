import { Loading } from 'element-ui';

const loadUtil = {
    loadingCount:0,
    loading:null,
    startLoading(){
        this.loading = Loading.service({
            lock: true,
            text: '数据加载中...',//可以自定义文字
            spinner:'el-icon-loading',//自定义加载图标类名
            background: 'rgba(0, 0, 0, 0.7)'//遮罩层背景色
        });
    },
    endLoading(){
        this.loading.close();
    },
    showLoading(){
        if (this.loadingCount === 0) {
            this.startLoading();
        }
        this.loadingCount += 1;
    },
    hideLoading(){
        if (this.loadingCount <= 0) {
            return;
        }
        this.loadingCount -= 1;
        if (this.loadingCount === 0) {
            this.endLoading();
        }
    }
};
export default loadUtil