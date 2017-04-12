import axios from 'axios';
const VueResourceProgressBarInterceptor = {
    install: (Vue, options = {}) => {
        const progress = Vue.prototype.$Progress;
        if (progress == null) {
            console.error('vue-resouce-progressbar-interceptor: vue-progress-bar is not installed. ' +
                'Please install it from https://github.com/hilongjw/vue-progressbar');
            return;
        }
        let requestsTotal = 0;
        let requestsCompleted = 0;
        function setComplete() {
            requestsTotal = 0;
            requestsCompleted = 0;
            progress.finish();
        }
        const latencyThreshold = options.latencyThreshold != null ? options.latencyThreshold : 100;
        const responseLatency = options.responseLatency != null ? options.responseLatency : 100; //change 50=>100
        ; {
            let showProgressBar = true;
            let completed;
            axios.interceptors.request.use(function(config) {
                if (config.showProgressBar != null) {
                    showProgressBar = config.showProgressBar;
                    delete config.showProgressBar;
                }
                if (showProgressBar) {
                    if (requestsTotal === 0) {
                        if (latencyThreshold === 0) {
                            progress.start();
                        } else {
                            setTimeout(() => {
                                if (requestsTotal !== requestsCompleted) {
                                    progress.start();
                                }
                            }, latencyThreshold);
                        }
                    }
                    requestsTotal++;
                    if (progress.$vm.RADON_LOADING_BAR.options.show) {
                        completed = (requestsCompleted / requestsTotal) * 100 + 1;
                        progress.set(completed);
                    }
                }
                return config;
            }, function(error) {
                return Promise.reject(error);
            });
            axios.interceptors.response.use(function(response) {
                if (!showProgressBar) {
                    return response;
                }
                setTimeout(() => {
                    if (response.status!==200) {
                        progress.fail();
                        setComplete();
                    }
                    requestsCompleted++;
                    if (requestsCompleted >= requestsTotal) {
                        setComplete();
                    } else {
                        completed = ((requestsCompleted / requestsTotal) * 100) - 10;
                        progress.set(completed);
                    }
                }, responseLatency);
                return response;

            }, function(error) {
                return Promise.reject(error);
            });
        };

    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = VueResourceProgressBarInterceptor;
}
