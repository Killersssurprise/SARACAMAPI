(window.webpackJsonp = window.webpackJsonp || []).push([[1], {
    0: function (t, e, i) {
        t.exports = i("zUnb")
    }, "46Z2": function (t, e, i) {
        t.exports = i.p + "app/worker/video-es2019.worker.js"
    }, O1sb: function (t, e, i) {
        "use strict";
        (function (t) {
            i.d(e, "a", (function () {
                return r
            }));
            var s = i("EYJY"), n = i("6UlS"), a = i("WHjG");

            class r {
                constructor(e, i, a) {
                    this.url = e, this.streamImageFormat = i, this.ngZone = a, this.isConnected = !1, this.playAfterConnect = !1, this.playAfterConnectPreload = 10, this.ngZone.runOutsideAngular(() => {
                        this.imageSubject = new s.a, this.streamState = new n.a(!1), this.worker = new Worker(t, {
                            name: "app/worker/video",
                            type: void 0
                        }), this.init()
                    })
                }

                init() {
                    this.publishMessage({
                        type: a.a.INIT,
                        info: {url: this.url, request: this.streamImageFormat.request}
                    }), this.addListeners()
                }

                addListeners() {
                    this.ngZone.runOutsideAngular(() => {
                        this.worker.onmessage = ({data: t}) => {
                            switch (t.type) {
                                case a.b.IMAGE:
                                    this.imageSubject.next(t.info);
                                    break;
                                case a.b.STOPPED:
                                    this.streamState.next(!1 === t.info);
                                    break;
                                case a.b.CONNECTED:
                                    this.isConnected = !0, this.playAfterConnect && this.play(this.playAfterConnectPreload);
                                    break;
                                default:
                                    console.log("unknown command")
                            }
                        }
                    })
                }

                publishMessage(t) {
                    this.worker.postMessage(t)
                }

                setCommand(t) {
                    this.publishMessage({type: a.a.SET_COMMAND, info: t.request})
                }

                play(t = 10) {
                    this.isConnected ? this.publishMessage({
                        type: a.a.PLAY,
                        info: t
                    }) : (this.playAfterConnect = !0, this.playAfterConnectPreload = t)
                }

                stopStream() {
                    this.publishMessage({type: a.a.STOP_STREAM})
                }

                playFrame() {
                    this.publishMessage({type: a.a.PLAY_FRAME})
                }

                playAndStop(t) {
                    this.publishMessage({type: a.a.PLAY_AND_STOP, info: t})
                }

                disableHeartbeat() {
                    this.publishMessage({type: a.a.DISABLE_HEART_BEATS})
                }

                enableHeartbeat() {
                    this.publishMessage({type: a.a.ENABLE_HEART_BEATS})
                }

                close() {
                    this.imageSubject.unsubscribe(), this.worker.terminate(), this.publishMessage({type: a.a.CLOSE_CONNECTION})
                }
            }
        }).call(this, i("46Z2"))
    }, WHjG: function (t, e, i) {
        "use strict";
        i.d(e, "a", (function () {
            return s
        })), i.d(e, "b", (function () {
            return n
        }));
        var s = function (t) {
            return t.INIT = "init", t.PLAY = "play", t.STOP = "stop", t.PLAY_FRAME = "playFrame", t.PLAY_AND_STOP = "playAndStop", t.ENABLE_HEART_BEATS = "enableHeartbeat", t.DISABLE_HEART_BEATS = "disableHeartbeat", t.STOP_STREAM = "stopStream", t.SET_COMMAND = "setCommand", t.CLOSE_CONNECTION = "close", t
        }({}), n = function (t) {
            return t[t.CONNECTED = 0] = "CONNECTED", t[t.IMAGE = 1] = "IMAGE", t[t.STOPPED = 2] = "STOPPED", t
        }({})
    }, zUnb: function (t, e, i) {
        "use strict";
        i.r(e);
        var s = i("Ub9n");
        i("ernz");
        var n = function (t) {
            return t.http = "http", t.https = "https", t
        }({}), a = i("CTT8"), r = i("FBrc");
        let o = (() => {
            class t {
                constructor(t) {
                    this.httpClient = t, this.encryptSecretKey = "8DA21FEA4263C3F64D716DDDF3FD7", this.authorizedDevice = null, this.checkEmbededAuth()
                }

                checkEmbededAuth() {
                    if (document.ip) {
                        let t = document.port || document.location.port, e = document.ip;
                        e.includes(":") && ([e, t] = e.split(":"));
                        const i = location.protocol.substr(0, location.protocol.length - 1);
                        return t || (t = i === n.http ? "80" : "443"), this.authorizedDevice = {
                            ip: e,
                            protocol: i,
                            port: parseInt(t)
                        }, !0
                    }
                    return !1
                }

                logout() {
                    return this.httpClient.post(this.getApiUrl(), {request: {job: "logOut"}}, {withCredentials: !0})
                }

                encryptPassword(t) {
                    try {
                        return a.AES.encrypt(JSON.stringify(t), this.encryptSecretKey).toString()
                    } catch (e) {
                        console.log(e)
                    }
                }

                decryptPassword(t) {
                    try {
                        const e = a.AES.decrypt(t, this.encryptSecretKey);
                        return e.toString() ? JSON.parse(e.toString(a.enc.Utf8)) : t
                    } catch (e) {
                        console.log(e)
                    }
                }

                getApiUrl(t, e, i) {
                    const s = this.getDeviceUrl(t, e, i);
                    return s ? s + "/api11.php" : null
                }

                getEndpointUrl(t, e, i, s, n) {
                    const a = this.getDeviceUrl(i, s, n) || "", r = [t, e].filter(t => "" !== t);
                    return [a, "api/"].join("/") + [...r].join("/")
                }

                getDeviceUrl(t, e, i) {
                    return e = e || (this.authorizedDevice ? this.authorizedDevice.port : null), i = i || (this.authorizedDevice ? this.authorizedDevice.protocol : null), null != (t = t || (this.authorizedDevice ? this.authorizedDevice.ip : null)) && i ? 80 === e ? i + "://" + t : i + "://" + t + ":" + e : document.ip && document.location.protocol && document.location.protocol.includes("http") ? document.location.protocol + "//" + document.ip : null
                }

                getWsUrl(t = "xml_tcp") {
                    t = "/" + t;
                    const e = this.authorizedDevice.port;
                    return this.authorizedDevice && this.authorizedDevice.ip && this.authorizedDevice.protocol ? "http" === this.authorizedDevice.protocol ? e && 80 !== e ? "ws://" + this.authorizedDevice.ip + ":" + e + t : "ws://" + this.authorizedDevice.ip + t : e && 443 !== e ? "ws://" + this.authorizedDevice.ip + ":" + e + t : "wss://" + this.authorizedDevice.ip + t : document.ip && document.location.protocol && document.location.protocol.includes("http") ? "http:" === document.location.protocol ? "ws://" + document.ip + t : "wss://" + document.ip + t : null
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(r.b))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })();
        var c = i("vlQ6");
        let l = (() => {
            class t {
                constructor(t, e, i, s, n) {
                    this.config = t, this.ws = e, this.sr = i, this.motorDbService = s, this.cameraSelectorService = n, this.hasError = !1, this.busy = !0, this.motorDbService.getCameraInfo().then(t => {
                        this.cameraInfo = t, this.busy = !1
                    }), this.motorDbService.cameraInfo.subscribe(t => {
                        this.cameraInfo = t
                    })
                }

                get isError() {
                    return this.hasError
                }

                get isBusy() {
                    return this.busy
                }

                get withFeedback() {
                    return this.config.feedback
                }

                get minValue() {
                    return this.withFeedback ? this.config.minValue : null
                }

                get maxValue() {
                    return this.withFeedback ? this.config.maxValue : null
                }

                get isInverse() {
                    return this.config.inverse
                }

                get name() {
                    return this.config.id
                }

                get singleDirection() {
                    return this.config.singleDirection ? this.config.singleDirection : 0
                }

                get allowedRange() {
                    return this.config.allowedRange ? this.config.allowedRange : 0
                }

                get minText() {
                    return this.config && this.config.minText && "UNKNOWN" !== this.config.minText ? this.config.minText : ""
                }

                get maxText() {
                    return this.config && this.config.maxText && "UNKNOWN" !== this.config.maxText ? this.config.maxText : ""
                }

                get isCreatedBySocket() {
                    return !this.config.manual
                }

                get step() {
                    if (!this.withFeedback) return 100;
                    if (null !== this.minValue && null !== this.maxValue && this.minValue !== this.maxValue) {
                        const t = Math.abs(this.maxValue - this.minValue), e = Math.round(t / 10);
                        return e < 10 ? e : e >= 10 && e < 100 ? 10 * Math.round(e / 10) : e >= 100 && e < 1e3 ? 100 * Math.round(e / 100) : 1e3 * Math.round(e / 1e3)
                    }
                    return 1
                }

                get cachedValue() {
                    return this.cached
                }

                timeoutPromise(t) {
                    return new Promise(e => setTimeout(e, t))
                }

                async execCommand(t, e = 300, i = !0) {
                    this.ws.disableHeartbeat(!1), this.ws.send(t), this.busy = !0;
                    const s = await this.sr.asyncReadLine();
                    return i && this.ws.restartHearbeat(), e > 0 ? this.timeoutPromise(e).then(() => this.busy = !1) : this.busy = !1, s
                }

                async commandWithFeedBack(t, e = null, i = !1, s = 0) {
                    if (!this.withFeedback) return null;
                    const n = await this.execCommand(t);
                    return !this.checkResponseStatus(n) && s < 10 ? (s++, this.commandWithFeedBack(e || t, null, i, s++)) : i ? this.saveCurrentPositionToCache(this.getResponseCurrent(n)) : this.getResponseCurrent(n)
                }

                async commandWithoutFeedBack(t) {
                    return this.withFeedback ? null : this.execCommand(t)
                }

                checkResponseStatus(e) {
                    const i = t.RegExpStatus.exec(e);
                    return i ? (this.hasError = !1, "00" === i[1]) : (this.hasError = !0, !1)
                }

                getResponseCurrent(e) {
                    const i = t.RegExpCurrent.exec(e);
                    return i && i.length > 0 ? parseFloat(i[1]) : -1
                }

                saveCurrentPositionToCache(t) {
                    return this.cached = t, t
                }

                saveCurrentPromisePositionToCache(t) {
                    return t.then(t => this.saveCurrentPositionToCache(t)), t
                }

                get userValue() {
                    return this.getCurrentPosition()
                }

                setValueViaApi(t, e, i) {
                    return this.busy = !0, "number" == typeof e && this.config.inverse && (e = i ? this.config.maxValue - (e - this.config.minValue) : -1 * e), new Promise(i => {
                        this.motorDbService.sendToDb(t, null, {
                            cameraData: this.cameraSelectorService.selectedCamera,
                            value: e
                        }, t => {
                            const e = Boolean(t.execLib.result);
                            this.busy = !1, i(e)
                        })
                    })
                }
            }

            return t.RegExpStatus = /STATUS=([0-9]+)/, t.RegExpCurrent = /CURRENT=([0-9]+)/, t
        })();
        var h = i("EYJY"), u = i("7pIA"), d = i("6UlS"), m = i("WKA6"), b = i("XA6Z"), g = i("O6Zd"), f = i("HQAO"),
            p = i("6Xem");
        let S = (() => {
            class t {
                constructor(t, e) {
                    this.httpClient = t, this.linkService = e, this.cameraChanged = new h.a, this.data = [], this.refresh = new d.a(null), console.log("Camera selector service inited"), this.setCameraListObservable()
                }

                set selectedCamera(t) {
                    t ? (this.selectedCameraData = this.data.find(e => e.instance === t.instance), this.cameraChanged.next(!0), localStorage.setItem("cameraSelector.selectedCamera" + this.storagePostfix, JSON.stringify(this.selectedCamera))) : this.selectedCameraData = null
                }

                get selectedCamera() {
                    return this.selectedCameraData
                }

                get storagePostfix() {
                    return this.linkService ? this.linkService.getDeviceUrl() : ""
                }

                init() {
                    this.cameraList.pipe(Object(m.a)(1)).subscribe(t => {
                        const e = this.data.find(t => JSON.stringify(t) === localStorage.getItem("cameraSelector.selectedCamera" + this.storagePostfix));
                        this.selectedCamera = e || this.data[0] || null
                    })
                }

                setCameraListObservable() {
                    const t = {request: {job: "getCameraList"}};
                    this.cameraList = this.refresh.pipe(Object(b.a)(() => {
                        const e = this.linkService.getApiUrl();
                        return this.httpClient.post(e, t, {withCredentials: !0}).pipe(Object(g.a)(t => {
                            if (t && !1 !== t.exec.result && t.getCameraList) return this.data = t.getCameraList || [], this.data;
                            alert("API error")
                        }), Object(f.a)(1), Object(p.a)())
                    }))
                }

                getCameraList() {
                    const t = this.linkService.getApiUrl();
                    return this.httpClient.post(t, {request: {job: "getCameraList"}}, {withCredentials: !0}).pipe(Object(g.a)(t => {
                        if (!t || !1 === t.exec.result || !t.getCameraList) return void alert("API error");
                        this.data = t.getCameraList || [];
                        const e = this.data.find(t => JSON.stringify(t) === localStorage.getItem("cameraSelector.selectedCamera" + this.storagePostfix));
                        return this.selectedCamera = e || this.data[0] || null, this.data
                    }))
                }

                getCameraListSnapshots() {
                    const t = [];
                    this.data.forEach(e => {
                        t.push({instance: e.instance, width: 300, cq: 60})
                    });
                    const e = {request: {job: "getImages", cameraList: t}}, i = this.linkService.getApiUrl();
                    return this.httpClient.post(i, e, {withCredentials: !0}).pipe(Object(g.a)(t => {
                        if (!t || !1 === t.exec.result || !t.result) return void alert("API error");
                        const e = new Map;
                        return t.result.forEach(t => {
                            t.image && (e[t.instance] = t.image.image)
                        }), e
                    }))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(r.b), s.Sb(o, 8))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac, providedIn: "root"}), t
        })(), v = (() => {
            class t {
                constructor(t, e, i) {
                    this.httpClient = t, this.cameraSelectorService = e, this.linkService = i, this.cameraInfo = new h.a, this.chain = [], this.firstIsLoading = !0, this.subscriptions = [this.cameraSelectorService.cameraList.subscribe(t => {
                        this.chain = [], this.startPoller()
                    })]
                }

                ngOnDestroy() {
                    this.subscriptions.forEach(t => t.unsubscribe()), this.poller && this.poller.unsubscribe(), this.cameraInfo.unsubscribe(), this.currentRequest && this.currentRequest.unsubscribe()
                }

                async getCameraInfo() {
                    return this.isLoading ? new Promise(t => {
                        this.chain.push(t)
                    }) : this.cameraData !== this.cameraSelectorService.selectedCamera ? (this.isLoading = !0, this.chain = [], new Promise((t, e) => {
                        const i = {
                            request: {
                                job: "execLib",
                                execLib: {
                                    type: "LensFacade",
                                    function: "getInfo",
                                    params: {cameraData: this.cameraSelectorService.selectedCamera}
                                }
                            }
                        };
                        this.httpClient.post(this.linkService.getApiUrl(), i, {withCredentials: !0}).subscribe(i => {
                            this.isLoading = !1, i.exec.result ? (this.rdata = i.execLib.result, t(this.rdata), this.chain.forEach(t => t(this.rdata)), this.cameraData = this.cameraSelectorService.selectedCamera, this.cameraInfo.next(this.rdata), this.firstIsLoading = !1) : e()
                        }, t => e(t))
                    })) : this.rdata
                }

                sendToDb(t, e, i = null, s = null, n = null, a = !1) {
                    !1 === a && (this.isLoading = !0);
                    const r = {
                        request: {
                            job: "execLib",
                            execLib: {type: "LensFacade", function: t, params: null != i ? i : `${e},false`}
                        }
                    };
                    this.currentRequest && !1 === a && this.currentRequest.unsubscribe(), this.currentRequest = this.httpClient.post(this.linkService.getApiUrl(), r, {withCredentials: !0}).subscribe(t => {
                        s && s(t), !1 === a && (this.isLoading = !1, this.refreshData(!0))
                    }, t => {
                    })
                }

                startPoller() {
                    this.poller && this.poller.unsubscribe(), this.poller = Object(u.a)(0, 15e3).pipe().subscribe(() => {
                        this.currentRequest && !0 !== this.currentRequest.closed || this.refreshData(!0)
                    })
                }

                stopPoller() {
                    this.poller && (this.poller.unsubscribe(), this.poller = null)
                }

                refreshData(t = !1) {
                    !0 !== this.isLoading && this.sendToDb("getInfo", null, {cameraData: this.cameraSelectorService.selectedCamera}, t => {
                        JSON.stringify(this.rdata) !== JSON.stringify(t.execLib.result) && (this.rdata = t.execLib.result, this.cameraInfo.next(this.rdata))
                    }, null, t)
                }
            }

            return t.SaveFocusCommand = "saveFocus", t.SaveIrisCommand = "saveIris", t.SetIrisManual = "setIrisManual", t.SetFocusManual = "setFocusManual", t.SetIRFManual = "setIRFAutoMode", t.SetIrlevel1 = "setIrlevel1", t.SetIrlevel2 = "setIrlevel2", t.SetIRFCommand = "setIRF", t.SetIRFStatusCommand = "setIRFStatus", t.SetPhotosyncPhaseCommand = "setPhotosyncPhase", t.SetShortExposure = "SetShortExposure", t.SetLongExposure = "SetLongExposure", t.SetBestExposure = "SetBestExposure", t.SetTilt = "setTilt", t.SetZoomPos = "setZoomPos", t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(r.b), s.Sb(S), s.Sb(o))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })();

        class w extends l {
            getCurrentPosition() {
                return this.cameraInfo.irfon ? 1 : 0
            }

            async setCurrentPosition(t) {
                return this.busy = !0, new Promise(e => {
                    this.motorDbService.sendToDb(v.SetIRFCommand, null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, t => {
                        const i = Boolean(t.execLib.result);
                        this.busy = !1, e(i)
                    })
                })
            }

            async spinMotor(t) {
                return null
            }

            get isManual() {
                return this.cameraInfo.irfmanual
            }

            async setManual(t) {
                return new Promise((e, i) => {
                    this.motorDbService.sendToDb(v.SetIRFManual, null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t ? "off" : "sun"
                    }, t => {
                        const i = Boolean(t.execLib.result);
                        e(i)
                    }, i)
                })
            }

            async setIrFilterStatus(t) {
                return new Promise((e, i) => {
                    this.motorDbService.sendToDb(v.SetIRFStatusCommand, null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t ? "ONIRF" : "OFFIRF"
                    }, t => {
                        const i = Boolean(t.execLib.result);
                        e(i)
                    }, i)
                })
            }

            get canAuto() {
                return !0
            }
        }

        class x extends l {
            getCurrentPosition() {
                return this.cameraInfo.tiltPos
            }

            async setCurrentPosition(t) {
                return this.busy = !0, new Promise(e => {
                    this.motorDbService.sendToDb("setTiltPos", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, t => {
                        const i = Boolean(t.execLib.result);
                        this.busy = !1, e(i)
                    })
                })
            }

            async spinMotor(t) {
                return null
            }

            get isManual() {
                return !0
            }

            async setManual(t) {
                return null
            }

            get canAuto() {
                return !1
            }

            get canSet() {
                return this.cameraInfo.canSetTilt
            }
        }

        let C = (() => {
            class t extends l {
                constructor(t, e, i, s, n, a = null) {
                    super(t, e, i, s, n), this.translate = a, this.confirmMessage = "", this.translate.get("WAR_FIXING").subscribe(t => {
                        this.confirmMessage = t
                    })
                }

                calibrate() {
                    return this.singleDirection && this.allowedRange ? new Promise(async t => {
                        const e = this.singleDirection ? 9e3 * this.singleDirection : -9e3,
                            i = this.singleDirection ? -1 * this.singleDirection * this.allowedRange : 9e3;
                        let s = 0;
                        console.log("endEdgeWithTrailer", e), console.log("maxStepMove", i);
                        let n = await this.spinMotorSocket(e),
                            a = this.singleDirection ? this.allowedRange : await this.spinMotorSocket(i);
                        if (console.log("position", n), console.log("maxPosition", a), a = Math.abs(a), n = Math.abs(n), s = e < 0 ? n : a - n, s > a && (s = a, n = a), s < 0 && (s = 0), console.log("currentPosition", s), a > 0) {
                            const t = this.singleDirection ? -1 * this.singleDirection * n : -1 * (a - s);
                            console.log("backSteps", t), await this.spinMotorSocket(t)
                        }
                        this.busy = !0, this.motorDbService.sendToDb("setZoomPosCalibratedMax", null, {
                            cameraData: this.cameraSelectorService.selectedCamera,
                            value: [a, s].join(",")
                        }, e => {
                            const i = Boolean(e.execLib.result);
                            this.busy = !1, this.config = {
                                ...this.config,
                                feedback: a > 0,
                                maxValue: a,
                                minValue: 0
                            }, this.cameraInfo = {
                                ...this.cameraInfo,
                                zoom: s
                            }, 0 === a && alert(this.confirmMessage), t(i)
                        }), this.ws.restartHearbeat()
                    }) : Promise.resolve(!1)
                }

                async spinMotorSocket(e) {
                    const i = await this.execCommand(t.SPIN_COMMAND.replace("#value#", e.toString()), 0, !1),
                        s = t.RegExpSteps.exec(i);
                    return s ? parseInt(s[1], 10) : 0
                }

                getCurrentPosition() {
                    return this.cameraInfo.zoomPos
                }

                async setCurrentPosition(t) {
                    return this.busy = !0, this.cameraInfo.mountstatus ? confirm(this.confirmMessage) ? this.getPromiseForSetZoomPos(t) : new Promise(e => {
                        this.motorDbService.sendToDb("setZoomPos", null, {
                            cameraData: this.cameraSelectorService.selectedCamera,
                            value: t
                        }, t => {
                            const i = Boolean(t.execLib.result);
                            this.busy = !1, e(i)
                        })
                    }) : this.getPromiseForSetZoomPos(t)
                }

                getPromiseForSetZoomPos(t) {
                    return new Promise(e => {
                        this.motorDbService.sendToDb("setZoomPos", null, {
                            cameraData: this.cameraSelectorService.selectedCamera,
                            value: t
                        }, t => {
                            const i = Boolean(t.execLib.result);
                            this.busy = !1, e(i)
                        })
                    })
                }

                async spinMotor(t) {
                    return this.getPromiseForSetZoomPos(t)
                }

                get isManual() {
                    return !0
                }

                async setManual(t) {
                    return null
                }

                get canAuto() {
                    return !1
                }
            }

            return t.RegExpSteps = /STEPS=([-0-9]+)/, t.SPIN_COMMAND = "SETZOOMPOS #value#\n", t
        })();

        class y extends l {
            get minText() {
                return "NEAR"
            }

            get maxText() {
                return "FAR"
            }

            getCurrentPosition() {
                return this.cameraInfo.zoomPosMM
            }

            async setCurrentPosition(t) {
                return this.busy = !0, new Promise(e => {
                    this.motorDbService.sendToDb("setZoomPosMM", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, t => {
                        const i = Boolean(t.execLib.result);
                        this.busy = !1, e(i)
                    })
                })
            }

            async spinMotor(t) {
                return null
            }

            get isManual() {
                return !0
            }

            async setManual(t) {
                return null
            }

            get canAuto() {
                return !1
            }
        }

        let O = (() => {
            class t extends l {
                constructor(t, e, i, s, n, a = null) {
                    super(t, e, i, s, n), this.config = t, this.ws = e, this.sr = i, this.dbService = s, this.translate = a, this.translate.get("ERR_FOCUS_BORDERS").subscribe(t => {
                        this.errMessage = t
                    })
                }

                getCurrentPosition() {
                    return this.cameraInfo.focus
                }

                setCurrentPosition(t) {
                    return this.busy = !0, new Promise(e => {
                        this.motorDbService.sendToDb("saveFocusPos", null, {
                            cameraData: this.cameraSelectorService.selectedCamera,
                            value: t
                        }, t => {
                            const i = Boolean(t.execLib.result);
                            this.busy = !1, e(i)
                        })
                    })
                }

                spinMotor(t) {
                    return new Promise(e => {
                        this.motorDbService.sendToDb("setFocusPos", null, {
                            cameraData: this.cameraSelectorService.selectedCamera,
                            value: t
                        }, t => {
                            const i = Boolean(t.execLib.result);
                            this.busy = !1, e(i)
                        })
                    })
                }

                async spinMotorSocket(e) {
                    const i = await this.execCommand(t.SPIN_COMMAND.replace("#value#", e.toString()), 0, !1),
                        s = t.RegExpSteps.exec(i);
                    return s ? parseInt(s[1], 10) : 0
                }

                calibrate() {
                    return this.cameraInfo.canCalibrateMinMaxFocus ? new Promise(async t => {
                        const e = this.singleDirection ? 9e3 * this.singleDirection : -9e3,
                            i = this.singleDirection ? -1 * this.singleDirection * this.allowedRange : 9e3;
                        let s = 0, n = await this.spinMotorSocket(e),
                            a = this.singleDirection ? this.allowedRange : await this.spinMotorSocket(i);
                        if (a = Math.abs(a), n = Math.abs(n), console.log("position", n), console.log("maxPosition", a), s = e < 0 ? n : a - n, s > a && (s = a, n = a), s < 0 && (s = 0), console.log("currentPosition", s), a > 0) {
                            const t = this.singleDirection ? -1 * this.singleDirection * n : -1 * (a - s);
                            console.log("backSteps", t), await this.spinMotorSocket(t)
                        }
                        this.busy = !0, this.motorDbService.sendToDb("setFocusPosCalibratedMax", null, {
                            cameraData: this.cameraSelectorService.selectedCamera,
                            value: [a, s].join(",")
                        }, e => {
                            const i = Boolean(e.execLib.result);
                            this.busy = !1, this.config = {
                                ...this.config,
                                feedback: a > 0,
                                maxValue: a,
                                minValue: 0
                            }, this.cameraInfo = {...this.cameraInfo, focus: s}, 0 === a && alert(this.errMessage), t(i)
                        }), this.ws.restartHearbeat()
                    }) : Promise.resolve(!1)
                }

                get isManual() {
                    return !0
                }

                async setManual(t) {
                    return null
                }

                get canAuto() {
                    return !1
                }

                saveProfile(t, e) {
                    this.motorDbService.sendToDb("saveProfileFocus", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: [t, e].join(",")
                    }, t => {
                        console.log(t)
                    })
                }
            }

            return t.RegExpSteps = /STEPS=([-0-9]+)/, t.SPIN_COMMAND = "SETFOCUSPOS #value#\n", t
        })();

        class I extends l {
            constructor(t, e, i, s, n) {
                "CLOSE" !== t.positive && "CLOSE" !== t.maxText || (t.inverse = !0), super(t, e, i, s, n)
            }

            get step() {
                if (!this.withFeedback) return this.cameraInfo.stepDefaultMotorIris;
                if (null !== this.minValue && null !== this.maxValue && this.minValue !== this.maxValue) {
                    const t = Math.abs(this.maxValue - this.minValue), e = Math.round(t / 10);
                    return e < 10 ? e : e >= 10 && e < 100 ? 10 * Math.round(e / 10) : e >= 100 && e < 1e3 ? 100 * Math.round(e / 100) : 1e3 * Math.round(e / 1e3)
                }
                return 1
            }

            getCurrentPosition() {
                return this.cameraInfo.iris
            }

            async setCurrentPosition(t) {
                return this.setValueViaApi("saveIrisPos", t, !0)
            }

            async spinMotor(t) {
                return this.setValueViaApi("setIrisPos", t, !1)
            }

            get isManual() {
                return this.cameraInfo.irismanual
            }

            async setManual(t) {
                return this.setValueViaApi("setIrisManual", t, !1)
            }

            get canAuto() {
                return 3 === this.cameraInfo.autoGainController
            }

            get userValue() {
                return this.isInverse ? this.config.maxValue - (this.cameraInfo.iris - this.config.minValue) : this.cameraInfo.iris
            }
        }

        class E extends l {
            constructor(t, e, i, s, n, a) {
                super(t, e, i, s, n), this.inst = a
            }

            getCurrentPosition() {
                return this.inst ? this.cameraInfo.irlevel2 : this.cameraInfo.irlevel1
            }

            async setCurrentPosition(t) {
                return this.busy = !0, new Promise(e => {
                    this.motorDbService.sendToDb(this.inst ? "setIrlevel2" : "setIrlevel1", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, t => {
                        const i = Boolean(t.execLib.result);
                        this.busy = !1, e(i)
                    })
                })
            }

            async spinMotor(t) {
                return null
            }

            get isManual() {
                return !0
            }

            async setManual(t) {
                return null
            }

            get canAuto() {
                return !1
            }
        }

        class M extends l {
            constructor(t, e, i, s, n, a, r) {
                super(t, e, i, s, n), this.inst = a, this.num = r
            }

            getCurrentPosition() {
                const t = "extir" + this.num.toString() + "time" + this.inst.toString();
                return this.cameraInfo[t]
            }

            async setCurrentPosition(t) {
                return this.busy = !0, new Promise(e => {
                    this.motorDbService.sendToDb("setIr" + this.num.toString() + "Time" + this.inst.toString(), null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, t => {
                        const i = Boolean(t.execLib.result);
                        this.busy = !1, e(i)
                    })
                })
            }

            async spinMotor(t) {
                return null
            }

            get isManual() {
                return !0
            }

            async setManual(t) {
                return null
            }

            get canAuto() {
                return !1
            }
        }

        class D extends l {
            getCurrentPosition() {
                return this.cameraInfo.photosyncPhase
            }

            async setCurrentPosition(t) {
                return this.busy = !0, new Promise(e => {
                    this.motorDbService.sendToDb("setPhotosyncPhase", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, t => {
                        const i = Boolean(t.execLib.result);
                        this.busy = !1, e(i)
                    })
                })
            }

            async spinMotor(t) {
                return null
            }

            get isManual() {
                return !0
            }

            async setManual(t) {
                return null
            }

            get canAuto() {
                return !1
            }

            get canSetPhase() {
                return this.cameraInfo.canSetPhase
            }
        }

        class P extends l {
            constructor(t, e, i, s, n, a) {
                super(t, e, i, s, n), this.inst = a
            }

            getCurrentPosition() {
                return this.saveCurrentPositionToCache(1 === this.inst ? this.cameraInfo.shortExposure : 2 === this.inst ? this.cameraInfo.longExposure : this.cameraInfo.bestExposure)
            }

            async setCurrentPosition(t) {
                let e;
                return this.busy = !0, e = 1 === this.inst ? v.SetShortExposure : 2 === this.inst ? v.SetLongExposure : v.SetBestExposure, new Promise(i => {
                    this.motorDbService.sendToDb(e, null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, t => {
                        const e = Boolean(t.execLib.result);
                        this.busy = !1, i(e)
                    })
                })
            }

            async spinMotor(t) {
                return null
            }

            get isManual() {
                return !0
            }

            async setManual(t) {
                return null
            }

            get canAuto() {
                return !1
            }
        }

        class T extends l {
            getCurrentPosition() {
                return this.cameraInfo.focusByDistanceMM
            }

            async setCurrentPosition(t) {
                return this.busy = !0, new Promise(e => {
                    this.motorDbService.sendToDb("setFocusByDistance", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, t => {
                        const i = Boolean(t.execLib.result);
                        this.busy = !1, e(i)
                    })
                })
            }

            async spinMotor(t) {
                return null
            }

            get isManual() {
                return !0
            }

            async setManual(t) {
                return null
            }

            get canAuto() {
                return !1
            }
        }

        class N {
            static getMotor(t, e, i, s, n, a) {
                switch (t.id) {
                    case"IRIS":
                        return new I(t, e, i, s, a);
                    case"FOCUS":
                        return new O(t, e, i, s, a, n);
                    case"ZOOM":
                        return new C(t, e, i, s, a, n);
                    case"ZOOM_MM":
                        return new y(t, e, i, s, a);
                    case"TILT":
                        return new x(t, e, i, s, a);
                    case"IRF":
                        return new w(t, e, i, s, a);
                    case"IRLEVEL1":
                        return new E(t, e, i, s, a, 0);
                    case"IRLEVEL2":
                        return new E(t, e, i, s, a, 1);
                    case"EXTIR1TIME0":
                        return new M(t, e, i, s, a, 0, 1);
                    case"EXTIR1TIME1":
                        return new M(t, e, i, s, a, 1, 1);
                    case"EXTIR2TIME0":
                        return new M(t, e, i, s, a, 0, 2);
                    case"EXTIR2TIME1":
                        return new M(t, e, i, s, a, 1, 2);
                    case"EXTIR3TIME0":
                        return new M(t, e, i, s, a, 0, 3);
                    case"EXTIR3TIME1":
                        return new M(t, e, i, s, a, 1, 3);
                    case"EXTIR4TIME0":
                        return new M(t, e, i, s, a, 0, 4);
                    case"EXTIR4TIME1":
                        return new M(t, e, i, s, a, 1, 4);
                    case"PHASE":
                        return new D(t, e, i, s, a);
                    case"SHORT_EXPOSURE":
                        return new P(t, e, i, s, a, 1);
                    case"LONG_EXPOSURE":
                        return new P(t, e, i, s, a, 2);
                    case"BEST_EXPOSURE":
                        return new P(t, e, i, s, a, 3);
                    case"FOCUS_BY_DISTANCE":
                        return new T(t, e, i, s, a)
                }
                return null
            }
        }

        class _ {
            constructor(t, e, i, s) {
                this.fnc = e, this.method = t, this.arg = s, this.err = i
            }
        }

        class R {
            constructor(t) {
                this.callbacks = [], this.cache = new Array, this.ms = t, this.ms.onmessage = this._next.bind(this), this.ms.onclose = this._close.bind(this, "Connection closed"), this.ms.onerror = this._close.bind(this, "Connection error")
            }

            _next(t) {
                this.cache.push(t), this._startCallbacks(), this.cache.length > 200 && console.log("MEMORY LEAK DETECTED")
            }

            _close(t) {
                for (const e of this.callbacks) e.err.call(this, t)
            }

            readLine(t, e) {
                return this.callbacks.push(new _(this._readLine.bind(this), t, e)), this._startCallbacks(), this
            }

            clearCallbacks() {
                this.callbacks = []
            }

            destroy() {
                this.clearCallbacks(), this.cache = []
            }

            readXml(t, e) {
                return this.callbacks.push(new _(this._readXml.bind(this), t, e)), this._startCallbacks(), this
            }

            readBytes(t, e, i) {
                return this.callbacks.push(new _(this._readBytes.bind(this), e, i, t)), this._startCallbacks(), this
            }

            asyncReadLine() {
                return new Promise((t, e) => {
                    this.readLine(t, e)
                })
            }

            async asyncReadXml() {
                return new Promise((t, e) => {
                    this.readXml(t, e)
                })
            }

            asyncReadBytes(t) {
                return new Promise((e, i) => {
                    this.readBytes(t, e, i)
                })
            }

            clearCache() {
                this.cache = []
            }

            _readBytes(t) {
                let e = null;
                if (this.cache.length) {
                    const i = this._searchLenInCache(t);
                    i && (e = this._getMessageFromCache(i[0], i[1]))
                }
                return e
            }

            readUint8String(t) {
                return "string" == typeof t ? t : t instanceof ArrayBuffer ? String.fromCharCode.apply(null, new Uint8Array(t)) : t instanceof Uint8Array ? String.fromCharCode.apply(null, t) : void 0
            }

            _readXml() {
                let t = null;
                if (this.cache.length) {
                    const e = this._searchTagInCache();
                    e && (t = this._getMessageFromCache(e[0], e[1]))
                }
                return t
            }

            _readLine() {
                let t = null;
                if (this.cache.length) {
                    const e = this._searchSymbolInCache();
                    e && (t = this._getMessageFromCache(e[0], e[1]))
                }
                return t
            }

            _getMessageFromCache(t, e) {
                if (this.cache.length <= t) return null;
                if (this.cache[t].length <= e) return null;
                const i = this.cache[0];
                let s = "";
                if ("string" == typeof i) {
                    for (let e = 0; e < t; e++) s += this.cache[e];
                    s += this.cache[t].substr(0, e + 1)
                } else if (i instanceof ArrayBuffer) {
                    let i = e + 1;
                    for (let e = 0; e < t; e++) i += this.cache[e].byteLength;
                    const n = new ArrayBuffer(i), a = new Uint8Array(n);
                    let r = 0;
                    for (let s = 0; s <= t; s++) {
                        const i = s === t ? e + 1 : this.cache[s].byteLength, n = new Uint8Array(this.cache[s]);
                        for (let t = 0; t < i; t++) a[r++] = n[t]
                    }
                    s = n
                } else if (i instanceof Uint8Array) {
                    let i = e + 1;
                    for (let e = 0; e < t; e++) i += this.cache[e].byteLength;
                    const n = new Uint8Array(i);
                    let a = 0;
                    for (let s = 0; s <= t; s++) {
                        const i = s === t ? e + 1 : this.cache[s].byteLength, r = this.cache[s];
                        for (let t = 0; t < i; t++) n[a++] = r[t]
                    }
                    s = n
                }
                return t > 0 && this.cache.splice(0, t), e === (this.cache[0].length || this.cache[0].byteLength) - 1 ? this.cache.splice(0, 1) : this.cache[0] = this.cache[0].slice(e + 1), s
            }

            _searchSymbolInCache(t = "\n") {
                for (let e = 0; e < this.cache.length; e++) {
                    const i = this.cache[e];
                    if ("string" == typeof i) {
                        const s = i.indexOf(t);
                        if (s > -1) return [e, s]
                    } else if (i instanceof Uint8Array) {
                        const s = i.indexOf(t.charCodeAt(0));
                        if (s > -1) return [e, s]
                    } else if (i instanceof ArrayBuffer) {
                        const s = new Uint8Array(i).indexOf(t.charCodeAt(0));
                        if (s > -1) return [e, s]
                    }
                }
                return null
            }

            _searchTagInCache() {
                let t = this.cache[0], e = t.substring(0, t.indexOf(">") + 1);
                if (e.includes("/")) return [0, e.length];
                e = e.includes(" ") ? "</" + e.substring(1, e.indexOf(" ")) + ">" : "</" + e.substring(1, e.length);
                for (let i = 0; i < this.cache.length; i++) {
                    t = this.cache[i];
                    const s = t.indexOf(e);
                    if (s > -1) return [i, s + e.length]
                }
                return null
            }

            _searchLenInCache(t) {
                let e = 0;
                for (let i = 0; i < this.cache.length; i++) {
                    const s = this.cache[i].length || this.cache[i].byteLength;
                    if (e + s >= t) return [i, t - e - 1];
                    e += s
                }
                return null
            }

            _startCallbacks() {
                if (this.callbacks.length) {
                    const t = this.callbacks[0], e = t.method.call(this, t.arg);
                    null !== e && (this.callbacks.shift(), t.fnc instanceof Function ? t.fnc.call(this, e) : t.fnc instanceof Promise && t.fnc.then(e), this._startCallbacks())
                }
            }
        }

        class L {
            constructor(t, e, i = null, s = !1, n, a, r) {
                this.connecting = !1, this.opened = !1, this.closed = !0, this.forceclose = !1, this.messages = new Array, this.ponmessage = [], this.ponreconnect = [], this.ponconnect = [], this.ponerror = [], this.ponclose = [], this.hearbeatParams = null, this.url = t, this.protocol = e, this.binaryType = i, this.onreconnect = r, this.onmessage = a, this.onconnect = n, this.reconnectable = s
            }

            get hasHearbeats() {
                return null != this.hearbeatParams
            }

            set onmessage(t) {
                t && this.ponmessage.push(t)
            }

            set onreconnect(t) {
                t && this.ponreconnect.push(t)
            }

            set onconnect(t) {
                t && this.ponconnect.push(t)
            }

            set onerror(t) {
                t && this.ponerror.push(t)
            }

            set onclose(t) {
                t && this.ponclose.push(t)
            }

            init(t = !1) {
                return t && !this.reconnectable || this.connecting ? null : (this.socket = this.protocol ? new WebSocket(this.url, this.protocol) : new WebSocket(this.url), this.connecting = !0, this.closed = !0, this.forceclose = !1, this.socket && (this.socket.onopen = null, this.socket.onclose = null, this.socket.onerror = null, this.socket.onmessage = null), t && this.ponreconnect && this.ponreconnect.forEach((t, e) => t()), this.binaryType && (this.socket.binaryType = this.binaryType), this.socket.onopen = this.onopenh.bind(this), this.socket.onclose = this.oncloseh.bind(this), this.socket.onerror = this.onerrorh.bind(this), this.socket.onmessage = this.onmessageh.bind(this), this)
            }

            onopenh(t) {
                let e;
                for (this.opened = !0, this.connecting = !1, this.ponconnect && this.ponconnect.forEach((t, e) => t.call(null)); e = this.messages.shift();) this.send(e)
            }

            getConnectingStatus() {
                return this.opened ? "connected" : this.connecting ? "connecting" : "closed"
            }

            getURL() {
                return this.url
            }

            onmessageh(t) {
                if (this.ponmessage) {
                    const e = t.data;
                    let i = [e];
                    if (this.hearbeatParams) if ("string" == typeof e) {
                        if (e.substr(0, this.hearbeatParams.pingAnswer.length) === this.hearbeatParams.pingAnswer) return
                    } else if (e instanceof ArrayBuffer) {
                        const t = this.hearbeatParams.pingAnswerUint8;
                        let s = -1;
                        const n = new Uint8Array(e);
                        t:for (let e = 0; e < n.byteLength - t.byteLength + 1; e++) if (n[e] === t[0]) {
                            for (let i = 1; i < t.byteLength; i++) if (n[e + i] !== t[i]) continue t;
                            s = e;
                            break
                        }
                        s > -1 && (i = [e.slice(0, s), e.slice(s + t.byteLength + 1)], i = i.filter(t => t.byteLength > 0))
                    }
                    i.forEach(t => this.ponmessage.forEach((e, i) => e(t)))
                }
            }

            aftererrorh() {
                this.connecting && !this.forceclose && (this.connecting = !1)
            }

            onerrorh(t) {
                if (this.opened = !1, !this.forceclose) {
                    if (t.target !== this.socket) return;
                    this.aftererrorh(), this.ponerror && this.ponerror.forEach((e, i) => e(t))
                }
            }

            oncloseh(t) {
                this.opened = !1, this.heartbeat && this.heartbeat.unsubscribe(), 1e3 === t.code || 1006 === t.code ? (this.forceclose || setTimeout(() => this.init(!0), 1e4), this.ponclose && this.ponclose.forEach((e, i) => e(t))) : this.onerrorh(t)
            }

            close() {
                this.disableHeartbeat(), this.forceclose = !0, this.socket && this.socket.close(), this.ponmessage = null, this.ponreconnect = null, this.ponconnect = null, this.ponerror = null, this.ponclose = null
            }

            send(t) {
                this.connecting ? this.messages.push(t) : this.socket && this.socket.send(t)
            }

            enableHeartbeat(t = "PING", e = "PONG", i = 10, s = 10) {
                const n = (new TextEncoder).encode(e);
                return this.hearbeatParams = {
                    pingMessage: t,
                    pingAnswer: e,
                    sec: i,
                    firstRunDelaySec: s,
                    pingAnswerUint8: n
                }, this.heartbeat || (this.heartbeat = Object(u.a)(1e3 * s, 1e3 * i).subscribe(e => {
                    "connected" === this.getConnectingStatus() && this.send(t + "\n")
                })), this
            }

            restartHearbeat() {
                if (this.hearbeatParams) {
                    if (this.heartbeat && !this.heartbeat.closed) return this;
                    this.enableHeartbeat(this.hearbeatParams.pingMessage, this.hearbeatParams.pingAnswer, this.hearbeatParams.sec, this.hearbeatParams.firstRunDelaySec)
                }
                return this
            }

            disableHeartbeat(t = !0) {
                return this.heartbeat && this.heartbeat.unsubscribe(), t && (this.hearbeatParams = null), this
            }
        }

        var A = i("zasx");
        let k = (() => {
            class t {
                constructor(t, e, i) {
                    this.mt = t, this.translate = e, this.cameraSelectorService = i, this.data = [], this.isLoading = !0, this.wsChanged = !1, this.subscriptions = [], console.log("Motordata initializing"), this.updateCameraConnectionSocket(), this.subscriptions.push(this.cameraSelectorService.cameraChanged.subscribe(t => {
                        this.updateCameraConnectionSocket()
                    }))
                }

                ngOnDestroy() {
                    this.subscriptions.forEach(t => t.unsubscribe()), this.ws && this.ws.close()
                }

                updateCameraConnectionSocket() {
                    if (this.cameraSelectorService.selectedCamera) {
                        if (console.log("Motordata camera change detected"), this.cameraSelectorService.selectedCamera.wsurl === this.currentWsUrl) return;
                        this.currentWsUrl = this.cameraSelectorService.selectedCamera.wsurl, this.data = [], this.isLoading = !0, this.ws && "connected" === this.ws.getConnectingStatus() && (this.ws.close(), this.ws = null, this.wsChanged = !0), this.ws = new L(this.cameraSelectorService.selectedCamera.wsurl, "text", null, !0), this.ws.onconnect = () => {
                            this.onConnectHandler()
                        }, this.ws.init()
                    }
                }

                get commonMotors() {
                    return this.data.filter((t, e, i) => "ZOOM" === t.name && !t.withFeedback || "ZOOM" !== t.name && "ZOOM_MM" !== t.name && "IRF" !== t.name)
                }

                get motorIRF() {
                    return this.getMotorByType("IRF")
                }

                get motorZoom() {
                    return this.getMotorByType("ZOOM")
                }

                get motorZoomMM() {
                    return this.getMotorByType("ZOOM_MM")
                }

                get motorPhase() {
                    return this.getMotorByType("PHASE")
                }

                get motorTilt() {
                    return this.getMotorByType("TILT")
                }

                reconnect() {
                    this.ws.init(!0)
                }

                getDevicesInfoUntilSuccess() {
                    this.ws.send("GETDEVICESINFO\n"), this.sr.asyncReadLine().then(t => {
                        "GETDEVICESINFO ERROR" === t.trim() ? (new Promise(t => setTimeout(t, 2e3)).then(t => {
                            !1 === this.wsChanged ? this.getDevicesInfoUntilSuccess() : this.wsChanged = !1
                        }), this.wsChanged = !1, this.plainData = "", this.parseData()) : (this.wsChanged = !1, this.plainData = t.trim(), this.parseData())
                    })
                }

                async onConnectHandler() {
                    try {
                        this.isLoading = !0, this.sr = new R(this.ws), this.ws.send("PROTOCOL 1.0\n"), await this.sr.asyncReadLine(), this.getDevicesInfoUntilSuccess()
                    } catch (t) {
                        console.log(t)
                    }
                }

                getMotorByType(t) {
                    for (const e of this.data) if (e.name === t) return e;
                    return null
                }

                canZoomCalibration() {
                    const t = this.getMotorByType("ZOOM");
                    return !(!t || !t.withFeedback)
                }

                hasZoomCalibrated() {
                    return !(!this.canZoomCalibration() || !this.getMotorByType("ZOOM_MM"))
                }

                anyMotorIsBusy() {
                    return this.data.filter(t => t.isBusy).length > 0
                }

                canShowComponent() {
                    return this.ws && "connected" === this.ws.getConnectingStatus() || !1 === this.mt.firstIsLoading
                }

                parseData() {
                    if (this.data = [], "" !== this.plainData) {
                        const t = this.plainData ? this.plainData.split(" (") : [];
                        this.mt.getCameraInfo().then(e => {
                            for (let i = 1; i < t.length; i++) {
                                const s = {
                                    id: "IRIS",
                                    feedback: !1,
                                    maxValue: -1,
                                    minValue: -1,
                                    maxText: "",
                                    minText: "",
                                    inverse: !1,
                                    positive: "",
                                    singleDirection: 0,
                                    allowedRange: 0
                                }, n = t[i].trim();
                                n.substring(0, n.length - 1).split(" ").forEach((t, e) => {
                                    if (0 === e) s.id = t; else {
                                        const e = t.split(":");
                                        "WITH_FEEDBACK" === e[0] ? s.feedback = !0 : "WITHOUT_FEEDBACK" === e[0] ? s.feedback = !1 : "MAXVALUE" === e[0] ? (s.maxValue = parseFloat(e[1]), s.maxText = e[2]) : "MINVALUE" === e[0] ? (s.minValue = parseFloat(e[1]), s.minText = e[2]) : "POSITIVE" === e[0] ? s.positive = e[1] : "SINGLE_PI_TRIGGER_DIRECTION" === e[0] ? s.singleDirection = parseFloat(e[1]) : "ALLOWED_RANGE" === e[0] && (s.allowedRange = parseFloat(e[1]))
                                    }
                                }), "FOCUS" === s.id && e.canCalibrateMinMaxFocus && e.calibratedMaxFocus > 0 && !s.feedback && (s.feedback = !0, s.minValue = 0, s.maxValue = e.calibratedMaxFocus), "ZOOM" === s.id && s.singleDirection && s.allowedRange && e.calibratedMaxZoom > 0 && (s.feedback = !0, s.minValue = 0, s.maxValue = e.calibratedMaxZoom);
                                const a = N.getMotor(s, this.ws, this.sr, this.mt, this.translate, this.cameraSelectorService);
                                "ZOOM" === s.id && !1 === s.feedback ? e.canSetZoomNoFeedback && a && this.data.push(a) : a && this.data.push(a)
                            }
                            this.addIrLevels(e), this.addExtIrTime(e), this.addPhase(e), this.addExposure(e), this.deleteTiltIfNeeded(e), this.addFocusByDistance(e), this.ws.enableHeartbeat("PROTOCOL 1.0", "PHRP", 15, 30)
                        })
                    }
                    this.isLoading = !1
                }

                addExtIrTime(t) {
                    if (t.hasExtIrlevels) for (let e = 0; e < t.countExtIrlevels; e++) this.data.push(N.getMotor(this.createExtIrTimeMotorData("EXTIR" + (e + 1) + "TIME0", t), this.ws, this.sr, this.mt, this.translate, this.cameraSelectorService)), this.data.push(N.getMotor(this.createExtIrTimeMotorData("EXTIR" + (e + 1) + "TIME1", t), this.ws, this.sr, this.mt, this.translate, this.cameraSelectorService))
                }

                addIrLevels(t) {
                    t.hasIrlevels && (this.data.push(N.getMotor(this.createIrlevelMotorData(0, t), this.ws, this.sr, this.mt, this.translate, this.cameraSelectorService)), this.data.push(N.getMotor(this.createIrlevelMotorData(1, t), this.ws, this.sr, this.mt, this.translate, this.cameraSelectorService)))
                }

                addFocusByDistance(t) {
                    t.hasFocusByDistance && this.data.push(N.getMotor(this.createFocusByDistance(t), this.ws, this.sr, this.mt, this.translate, this.cameraSelectorService))
                }

                addPhase(t) {
                    t.canSetPhase && this.data.push(N.getMotor(this.createPhaseMotorData(t), this.ws, this.sr, this.mt, this.translate, this.cameraSelectorService))
                }

                addExposure(t) {
                    t.hasExposure && (this.data.push(N.getMotor(this.createShortExposureMotorData(t), this.ws, this.sr, this.mt, this.translate, this.cameraSelectorService)), this.data.push(N.getMotor(this.createLongExposureMotorData(t), this.ws, this.sr, this.mt, this.translate, this.cameraSelectorService)), this.data.push(N.getMotor(this.createBestExposureMotorData(t), this.ws, this.sr, this.mt, this.translate, this.cameraSelectorService)))
                }

                deleteTiltIfNeeded(t) {
                    t.canSetTilt || (this.data = this.data.filter(t => "TILT" !== t.name))
                }

                saveHeightPresent(t) {
                    const e = {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: {
                            preset: t,
                            motor: this.data.reduce((t, e) => [...t, {
                                type: e.name,
                                value: e.getCurrentPosition()
                            }], []).reduce((t, e) => [...t, `${e.type}: ${e.value}`], []).join("\n")
                        }
                    };
                    return this.mt.sendToDb("setCameraPreset", null, e), e
                }

                createExtIrTimeMotorData(t, e) {
                    return {
                        id: t,
                        feedback: !0,
                        maxValue: e.irlevelmax,
                        minValue: e.irlevelmin,
                        minText: "",
                        maxText: "",
                        positive: "",
                        inverse: !1,
                        manual: !0
                    }
                }

                createIrlevelMotorData(t, e) {
                    return {
                        id: t ? "IRLEVEL2" : "IRLEVEL1",
                        feedback: !0,
                        maxValue: e.irlevelmax,
                        minValue: e.irlevelmin,
                        minText: "",
                        maxText: "",
                        positive: "",
                        inverse: !1,
                        manual: !0
                    }
                }

                createPhaseMotorData(t) {
                    return {
                        id: "PHASE",
                        feedback: !0,
                        maxValue: 360,
                        minValue: 0,
                        minText: "",
                        maxText: "",
                        positive: "",
                        inverse: !1,
                        manual: !0
                    }
                }

                createFocusByDistance(t) {
                    return {
                        id: "FOCUS_BY_DISTANCE",
                        feedback: !0,
                        maxValue: 250,
                        minValue: 50,
                        minText: "",
                        maxText: "",
                        positive: "",
                        inverse: !1,
                        manual: !0
                    }
                }

                createShortExposureMotorData(t) {
                    return {
                        id: "SHORT_EXPOSURE",
                        feedback: !0,
                        maxValue: 4e3,
                        minValue: 0,
                        minText: "",
                        maxText: "",
                        positive: "",
                        inverse: !1,
                        manual: !0
                    }
                }

                createLongExposureMotorData(t) {
                    return {
                        id: "LONG_EXPOSURE",
                        feedback: !0,
                        maxValue: 4e3,
                        minValue: 0,
                        minText: "",
                        maxText: "",
                        positive: "",
                        inverse: !1,
                        manual: !0
                    }
                }

                createBestExposureMotorData(t) {
                    return {
                        id: "BEST_EXPOSURE",
                        feedback: !0,
                        maxValue: 4e3,
                        minValue: 0,
                        minText: "",
                        maxText: "",
                        positive: "",
                        inverse: !1,
                        manual: !0
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(v), s.Sb(A.e), s.Sb(S))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })(), F = (() => {
            class t {
                constructor(t) {
                    this.httpClient = t, this.isLoading = !1, this.chain = []
                }

                async getData(t) {
                    return this.isLoading ? new Promise((t, e) => {
                        this.chain.push(t)
                    }) : this.data ? this.data : (this.isLoading = !0, this.chain = [], new Promise((t, e) => {
                        const i = this.getRequestOptions();
                        this.httpClient.post(document.apiurl || `http://${document.ip}/api11.php`, i, {withCredentials: !0}).subscribe(i => {
                            i.exec.result ? (this.data = i.execLib.result, this.isLoading = !1, t(this.data), this.chain.forEach(t => t(this.data))) : e()
                        }, t => e())
                    }))
                }

                getRequestOptions() {
                    return {request: {job: "execLib", execLib: {type: "cameradb", function: "getInfo", params: null}}}
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(r.b))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })();
        var V = i("+3x0");

        class B extends class {
            constructor() {
                this.leftOffset = 0, this.topOffset = 0
            }

            setDimensions(t) {
                this.width = t.width, this.height = t.height
            }

            getCroppedDimensions() {
                return {width: this.width, height: this.height}
            }

            setCropSettings(t, e, i, s) {
                this.leftOffset = t, this.width = i || this.width - t, this.topOffset = e, this.height = s || this.height - e
            }
        } {
            constructor() {
                super(...arguments), this.REQUEST_ID = 0, this.TIME = !0, this.leftOffset = 0, this.topOffset = 0
            }

            getRequestString() {
                return this.REQUEST_ID++, "GETFRAME REQUEST_ID=" + this.REQUEST_ID + " IMG_CONVERT_PARAMS=(DESTFORMAT=JPEG;DW=" + this.outputWidth + ";DESTQ=" + this.quality + ";L=" + this.leftOffset + ";T=" + this.topOffset + ";" + (this.width ? "W=" + this.width + ";" : "") + (this.height ? "H=" + this.height + ";" : "") + ") RET_PARAMS=(" + this.getRetParamsString() + ") WITHTIME=" + (this.TIME ? "1" : "0") + "\n"
            }

            getRetParamsString() {
                const t = [];
                return Object.getOwnPropertyNames(this).forEach(e => {
                    !0 === this[e] && t.push(e)
                }), t.join(";") + ";"
            }
        }

        class Z {
            convertLicenseNumberToCyrillic(t) {
                let e = "";
                for (let i = 0; i < t.length; i++) {
                    const s = t.charCodeAt(i);
                    if (s < 128) e += t.charAt(i); else if (s > 191 && s < 224 && i + 1 < t.length) {
                        const n = 255 & t.charCodeAt(i + 1);
                        e += String.fromCharCode((31 & s) << 6 | 63 & n), i++
                    }
                }
                return e
            }
        }

        class z extends Z {
            getParsedCsv(t = "") {
                const e = t.split(","), i = parseFloat(e[10]), s = parseFloat(e[11]),
                    n = Number(Math.round(3.6 * Math.sqrt(i * i + s * s))), a = Number(e[26]), r = n - a;
                return {
                    licnum: this.convertLicenseNumberToCyrillic(e[0]),
                    x1: Number(e[1]),
                    y1: Number(e[2]),
                    x2: Number(e[3]),
                    y2: Number(e[4]),
                    x3: Number(e[5]),
                    y3: Number(e[6]),
                    id: Number(e[7]),
                    x: Number(e[8]),
                    y: Number(e[9]),
                    xspeed: i,
                    yspeed: s,
                    speed: n,
                    len: Number(e[12]),
                    rectx: Number(e[13]),
                    recty: Number(e[14]),
                    rectw: Number(e[15]),
                    recth: Number(e[16]),
                    rectype: Number(e[17]),
                    channel: Number(e[18]).toString() === e[18] ? "" : atob(e[18]),
                    direction: Number(e[25]),
                    threshold: a,
                    overspeed: r,
                    classification_result: Number(e[27])
                }
            }
        }

        class U extends Z {
            constructor() {
                super(...arguments), this.getSnapshotCsvParser = new z
            }

            getAsRawTarget(t = "") {
                const e = t.split(",");
                return {
                    licnum: this.convertLicenseNumberToCyrillic(e[0]),
                    x1: Number(e[1]),
                    y1: Number(e[2]),
                    x2: Number(e[3]),
                    y2: Number(e[4]),
                    x3: Number(e[5]),
                    y3: Number(e[6]),
                    hist_mean: Number(e[7]),
                    harshness: Number(e[8]),
                    classification_result: Number(e[9]),
                    numFormat: Number(e[10]),
                    n_symbols: Number(e[11]),
                    ln_meters_front: Number(e[12]),
                    ln_meters_back: Number(e[13]),
                    speed: -1,
                    channel: "",
                    threshold: null,
                    overspeed: null
                }
            }

            getAsRawTarget2g(t = "") {
                const e = t.split(",");
                return {
                    id: Number(e[0]),
                    x: Number(e[1]),
                    y: Number(e[2]),
                    xspeed: Number(e[3]),
                    yspeed: Number(e[4]),
                    speed: Math.ceil(Math.sqrt(Number(e[3]) * Number(e[3]) + Number(e[4]) * Number(e[4]))),
                    len: Number(e[5])
                }
            }

            getParsedCsv(t = "") {
                return this.getSnapshotCsvParser.getParsedCsv(t)
            }
        }

        class H extends class {
            getCsv(t = "") {
                const e = [];
                return t && t.split("\n").forEach(t => {
                    t && e.push(this.csvParser.getParsedCsv(t))
                }), e
            }
        } {
            constructor() {
                super(...arguments), this.csvParser = new U, this.RET_PARAMS = {}
            }

            parseResponse(t) {
                t.split(" ").forEach(t => {
                    if (0 === t.indexOf("REQUEST_ID=")) this.REQUEST_ID = Number(this.parseStr(t)[1]); else if (0 === t.indexOf("W=")) this.W = Number(this.parseStr(t)[1]); else if (0 === t.indexOf("H=")) this.H = Number(this.parseStr(t)[1]); else if (0 === t.indexOf("FORMAT=")) this.FORMAT = this.parseStr(t)[1]; else if (0 === t.indexOf("LEN=")) this.LEN = Number(this.parseStr(t)[1]); else if (0 === t.indexOf("RET_PARAMS=")) {
                        let e = t.replace("RET_PARAMS=", "");
                        e = e.trim(), e = e.substr(1), e = e.substr(0, e.length - 1), this.parseStr(e, ";").forEach(t => {
                            if (t) if (t.indexOf("(") > -1 && t.indexOf(")") > -1) {
                                const e = this.parseStr(t);
                                this.RET_PARAMS[e[0]] = e[1].match(/\(.*?\)/g)
                            } else {
                                const e = this.parseStr(t);
                                this.RET_PARAMS[e[0]] = ["RED_LAMP", "TIME_SYNCED"].indexOf(e[0]) > -1 ? Number(e[1]) : e[0].indexOf("READY_TGT_") > -1 && "READY_TGT_COUNT" !== e[0] ? t : e[1]
                            }
                        })
                    }
                })
            }

            readHeader(t) {
                return this.parseResponse(t), {
                    csvSize: 0,
                    radarDataSize: 0,
                    imageLen: this.LEN,
                    time: parseFloat(this.RET_PARAMS.TIME),
                    tzoffset: this.RET_PARAMS.TZ_OFFSET,
                    ret_params: this.RET_PARAMS
                }
            }

            getImage() {
                return console.log("blob image from GetFrameResponse"), "blob image from GetFrameResponse"
            }

            getCsv(t = "") {
                const e = [];
                if (this.RET_PARAMS.LICENSE_NUMBERS && this.RET_PARAMS.LICENSE_NUMBERS.length) this.RET_PARAMS.LICENSE_NUMBERS.forEach(t => {
                    const i = this.csvParser.getAsRawTarget(t.replace(/[\(\)]+/g, ""));
                    e.push(i)
                }); else if (this.RET_PARAMS.READY_TGT_COUNT && Number(this.RET_PARAMS.READY_TGT_COUNT) > 0) {
                    const t = Number(this.RET_PARAMS.READY_TGT_COUNT);
                    for (let i = 0; i < t; i++) {
                        const t = this.RET_PARAMS["READY_TGT_" + i].replace("READY_TGT_" + i + "=", "");
                        e.push(this.csvParser.getParsedCsv(t))
                    }
                }
                return e
            }

            getTarget2G() {
                const t = [];
                return this.RET_PARAMS.TARGETS_2G && this.RET_PARAMS.TARGETS_2G.length && this.RET_PARAMS.TARGETS_2G.forEach(e => {
                    const i = this.csvParser.getAsRawTarget2g(e.replace(/[\(\)]+/g, ""));
                    t.push(i)
                }), t
            }

            parseStr(t, e = "=") {
                return t.split(e)
            }
        }

        class j extends class extends class {
            getParsedCsvs(t) {
                return []
            }

            getParsed2G() {
                return []
            }
        } {
            setQuality(t) {
                this.frameRequest.quality = t
            }

            setOutputWidth(t) {
                this.frameRequest.outputWidth = t
            }

            setOriginalImageDimensions(t) {
                this.frameRequest.setDimensions(t)
            }

            getCroppedDimensions() {
                return this.frameRequest.getCroppedDimensions()
            }

            setCropSettings(t, e, i, s) {
                this.frameRequest.setCropSettings(t, e, i, s)
            }

            getOffset() {
                const t = {leftOffset: this.frameRequest.leftOffset, topOffset: this.frameRequest.topOffset};
                return console.log("offsets:", t), t
            }

            getImage() {
                return this.frameResponse.getImage()
            }

            getParsedCsvs(t) {
                return this.frameResponse.getCsv(t)
            }

            getParsed2G() {
                return this.frameResponse.getTarget2G()
            }

            get request() {
                return this.frameRequest.getRequestString()
            }

            readHeader(t) {
                return this.frameResponse.readHeader(t)
            }

            csvReader(t) {
                return t
            }
        } {
            constructor(t) {
                super(), this.frameRequest = new B, this.frameResponse = new H, t && Object.getOwnPropertyNames(t).forEach(t => {
                    this.frameRequest[t] = !0
                })
            }

            setParams(t, e = !0) {
                return Object.getOwnPropertyNames(t).forEach(t => {
                    this.frameRequest[t] = e
                }), this
            }
        }

        var W = i("70cc"), G = i("vfyW"), Y = i("0/2g"), q = i("XRyL"), X = i("O1sb");
        let J = (() => {
            class t {
                constructor(t, e, i) {
                    this.httpClient = t, this.ngZone = e, this.linkService = i, this.storageKey = "crop-rectangle-service.cropSettings", this.cropSettingsSubject = new d.a(null), this.cropDragStarted = new h.a, this.cropDragStopped = new h.a, this.cropSettings = JSON.parse(localStorage.getItem(this.storageKey)), null === this.cropSettings && (this.cropSettings = {
                        x: 10,
                        y: 10,
                        w: 280,
                        h: 150
                    })
                }

                checkCropSettings(t, e, i, s) {
                    const n = this.getCropSettings();
                    let a = !1;
                    return (null === n || n.x + n.w > t && t > 100 || n.y + n.h > e && e > 100) && (a = !0), this.setCropSettings(a ? {
                        x: t / 2 - i / 2,
                        y: e / 2 - s / 2,
                        w: i,
                        h: s
                    } : n)
                }

                updateCropSettingsByParams(t, e, i, s, n, a) {
                    const r = this.getCropSettings();
                    return r.x = this.calculateRectanglePosition(t, i, n, r.w, r.x), r.y = this.calculateRectanglePosition(e, s, a, r.h, r.y), this.setCropSettings(r)
                }

                calculateRectanglePosition(t, e, i, s, n) {
                    return e + (s - t) >= i || e - t <= 0 ? Math.round(n) : Math.round(e - t)
                }

                setCropSettings(t) {
                    return this.cropSettings = t, this.ngZone.runOutsideAngular(() => {
                        this.cropSettingsSubject.next(this.cropSettings)
                    }), localStorage.setItem(this.storageKey, JSON.stringify(this.cropSettings)), t
                }

                getCropSettings() {
                    return this.cropSettings
                }

                convertCropSettingsToRectangle(t) {
                    return [{x: t.x, y: t.y}, {x: t.x + t.w, y: t.y}, {x: t.x, y: t.y + t.h}, {
                        x: t.x + t.w,
                        y: t.y + t.h
                    }]
                }

                getRectanglePoint() {
                    return this.httpClient.post(this.linkService.getApiUrl(), {request: {job: "getRectanglePoint"}}, {withCredentials: !0}).pipe(Object(g.a)(t => (t && !1 !== t.exec.result || alert("API error"), t.result)))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(r.b), s.Sb(s.v), s.Sb(o))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac, providedIn: "root"}), t
        })(), Q = (() => {
            class t {
                constructor(t, e, i) {
                    this.cameraSelectorService = t, this.ngZone = e, this.cropRectangleService = i, this.connected = !1, this.recognitionMode = !1, this.inited = new d.a(!1), this.snapshotData = new h.a, this.dimensionsChanged = new h.a, this.settingsPrefix = "", this.streamState = new d.a(!1), this.streamImageFormat = new j({
                        TIME: !0,
                        READY_TARGETS: !0,
                        RED_LAMP: !0,
                        REDLIGHT_POS: !0,
                        TZ_OFFSET: !0,
                        LICENSE_NUMBERS: !0,
                        SOURCE_DIMENSIONS: !0,
                        TARGETS_2G: !0,
                        SCREEN_POS_X: !0,
                        SCREEN_POS_Y: !0,
                        LASER_RANGE_IN_M: !0,
                        LASER_SPEED_IN_KMH: !0,
                        LASER_POS: !0
                    }), this.snapshotWidth = this.snapshotWidthList[2], this.snapshotQuality = this.snapshotQualityList[5], this.needToReconnect = !1, this.preload = 10, this.subscriptions = [], this.recognitionMode = this.getStorageItem("recognitionMode") === JSON.stringify(!0), this.streamImageFormat.setOutputWidth(this.snapshotWidth), this.streamImageFormat.setQuality(this.snapshotQuality), this.subscriptions.push(this.cameraSelectorService.cameraChanged.pipe(Object(W.a)(t => t)).subscribe(t => {
                        this.updateCameraData(this.cameraSelectorService.selectedCamera)
                    })), this.cameraSelectorService.selectedCamera && this.updateCameraData(this.cameraSelectorService.selectedCamera)
                }

                ngOnDestroy() {
                    this.disconnect(), this.needToReconnect = !1, this.subscriptions.forEach(t => t.unsubscribe())
                }

                getCroppedDimensions() {
                    return this.streamImageFormat.getCroppedDimensions()
                }

                setStreamImageOffset(t, e, i, s) {
                    this.streamImageFormat.setCropSettings(t, e, i, s), this.updateVideoClientCommand();
                    let n = !1;
                    const a = this.getCroppedDimensions();
                    (i && a.width !== i || s && a.height !== s) && (n = !0), n && (this.dimensionsChanged.next(a), this.playFrame())
                }

                setStreamImageQuality(t) {
                    this.streamImageFormat.setQuality(t), this.updateVideoClientCommand()
                }

                setStreamImageOutputWidth(t) {
                    this.streamImageFormat.setOutputWidth(t), this.updateVideoClientCommand()
                }

                setStreamImageFormat(t) {
                    this.streamImageFormat = t, this.streamImageFormat.setOutputWidth(this.snapshotWidth), this.streamImageFormat.setQuality(this.snapshotQuality), this.updateVideoClientCommand()
                }

                hasDelayedLiveVideo() {
                    return this.cameraData && "" !== this.cameraData.vurldemo
                }

                hasViolationService() {
                    return this.cameraData.hasViolationService
                }

                get isStopped() {
                    return !1 === this.streamState.getValue()
                }

                getCameraData() {
                    return this.cameraData
                }

                togglePlay() {
                    this.isStopped ? this.play() : this.stop()
                }

                playFrame() {
                    this.isStopped && this.videoClient.playFrame()
                }

                play(t = !0) {
                    t && this.setStorageItem("playStatus", JSON.stringify("PLAY")), !this.connected && this.needToReconnect || this.videoClient.play(this.preload)
                }

                playAndStop(t = 5) {
                    this.videoClient.playAndStop(t)
                }

                stop(t = !0) {
                    t && this.setStorageItem("playStatus", JSON.stringify("STOP")), this.videoClient && this.videoClient.stopStream()
                }

                get selectedSnapshotWidth() {
                    return this.snapshotWidth
                }

                set selectedSnapshotWidth(t) {
                    if (this.snapshotWidthList.indexOf(t) > -1) {
                        this.snapshotWidth = t, this.setStorageItem("selectedSnapshotWidth", this.selectedSnapshotWidth.toString()), this.streamImageFormat.setOutputWidth(t), this.updateVideoClientCommand();
                        const e = this.getCroppedDimensions();
                        e && void 0 !== e.width && void 0 !== e.height && this.dimensionsChanged.next(e)
                    }
                }

                get selectedSnapshotQuality() {
                    return this.snapshotQuality
                }

                set selectedSnapshotQuality(t) {
                    this.snapshotQualityList.indexOf(t) > -1 && (this.snapshotQuality = t, this.setStorageItem("selectedSnapshotQuality", this.selectedSnapshotQuality.toString()), this.streamImageFormat.setQuality(t), this.updateVideoClientCommand())
                }

                toggleRecognitionMode() {
                    this.recognitionMode = !this.recognitionMode, this.setStorageItem("recognitionMode", JSON.stringify(this.recognitionMode)), this.reconnect()
                }

                get snapshotWidthList() {
                    return [128, 256, 480, 720, 940, 1024, 1280, 1920]
                }

                get snapshotQualityList() {
                    return Array(10).fill(0).map((t, e) => 10 * e + 10)
                }

                disconnect() {
                    this.videoClient && (this.videoClient.disableHeartbeat(), this.videoClient.close(), this.videoClient = null, this.needToReconnect = !0), this.connected = !1
                }

                reconnect() {
                    this.disconnect(), this.ngZone.runOutsideAngular(() => {
                        this.videoClient = new X.a(this.recognitionMode ? this.cameraData.vurldemo : this.cameraData.vurl, this.streamImageFormat, this.ngZone), this.reinitStreamVideoReader()
                    })
                }

                getStorageItem(t) {
                    return localStorage.getItem("videoplayer." + this.settingsPrefix + "." + t)
                }

                setStorageItem(t, e) {
                    localStorage.setItem("videoplayer." + this.settingsPrefix + "." + t, e)
                }

                initDefaultSettings(t, e = !1, i = !1, s = !1) {
                    this.settingsPrefix = t, this.selectedSnapshotWidth = Number(this.getStorageItem("selectedSnapshotWidth")), this.selectedSnapshotQuality = Number(this.getStorageItem("selectedSnapshotQuality")), this.recognitionMode = e || "true" === this.getStorageItem("recognitionMode"), this.ngZone.runOutsideAngular(() => {
                        s && (this.preload = 1, this.subscriptions.push(...this.createCropRectangleSubscription())), this.subscriptions.push(this.createInitedSubscription(i, s))
                    })
                }

                createCropRectangleSubscription() {
                    if (this.cropRectangleService) {
                        const t = this.cropRectangleService.getCropSettings();
                        return this.setStreamImageOffset(t.x, t.y, t.w, t.h), [this.cropRectangleService.cropSettingsSubject.pipe(Object(W.a)(t => this.connected), Object(W.a)(t => !!t)).subscribe(t => {
                            this.setStreamImageOffset(t.x, t.y, t.w, t.h)
                        }), this.cropRectangleService.cropDragStarted.pipe(Object(g.a)(() => {
                            const t = this.isStopped;
                            return this.isStopped && this.play(), t
                        }), Object(G.a)(() => console.log("Drag started")), Object(Y.a)(() => this.cropRectangleService.cropDragStopped), Object(G.a)(() => console.log("Drag ended")), Object(q.a)(500)).subscribe(t => {
                            t && this.stop()
                        })]
                    }
                }

                updateVideoClientCommand() {
                    this.videoClient && this.videoClient.setCommand(this.streamImageFormat)
                }

                updateCameraData(t) {
                    (!this.cameraData || this.cameraData && this.cameraData.wsurl !== t.wsurl) && (this.cameraData = t, "VIEW" === this.cameraData.type && (this.recognitionMode = !1), this.reconnect())
                }

                reinitStreamVideoReader() {
                    this.connected = !1, this.subscriptions.push(this.videoClient.imageSubject.subscribe(t => {
                        this.ngZone.runOutsideAngular(() => {
                            this.snapshotData.next(t)
                        })
                    }), this.videoClient.imageSubject.pipe(Object(m.a)(1), Object(W.a)(t => !!t.header.ret_params.SOURCE_DIMENSIONS), Object(W.a)(t => "" !== t.header.ret_params.SOURCE_DIMENSIONS), Object(g.a)(t => t.header.ret_params.SOURCE_DIMENSIONS), Object(g.a)(t => t.split(",").map(t => parseInt(t, 10)))).subscribe(t => {
                        this.dimensionsChangeHandler({width: t[0], height: t[1]})
                    }), this.videoClient.streamState.subscribe(t => this.streamState.next(t)))
                }

                dimensionsChangeHandler(t) {
                    this.dimensions = t, this.streamImageFormat.setOriginalImageDimensions(this.dimensions), this.updateVideoClientCommand(), this.dimensionsChanged.next(this.dimensions), this.connected = !0, this.inited.next(!0)
                }

                createInitedSubscription(t, e) {
                    return this.inited.pipe(Object(W.a)(t => t)).subscribe(i => {
                        if (e) {
                            const t = this.cropRectangleService.getCropSettings();
                            this.setStreamImageOffset(t.x, t.y, t.w, t.h)
                        }
                        t || this.getStorageItem("playStatus") === JSON.stringify("PLAY") ? this.play() : this.playFrame()
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(S), s.Sb(s.v), s.Sb(J, 8))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })(), $ = (() => {
            class t {
                constructor(t) {
                    this.videoPlayerService = t, this.realSize = {
                        width: 920,
                        height: 320
                    }, this.rulerChanged = new h.a, this.pointsChanged = new h.a, this.subscriptions = [], this.ngOnInit()
                }

                ngOnInit() {
                    this.videoPlayerService.dimensions && (this.realSize = this.videoPlayerService.dimensions), this.subscriptions.push(this.videoPlayerService.dimensionsChanged.subscribe(t => this.realSize = t))
                }

                ngOnDestroy() {
                    this.subscriptions.forEach(t => {
                        t.unsubscribe()
                    })
                }

                onRulerChange([t, e, i, s]) {
                    console.log("ruler service: onRulerChange", [t, e, i, s]), this.onPointsChanged([t, e, i, s]), t *= this.realSize.width, i *= this.realSize.width, e *= this.realSize.height, s *= this.realSize.height;
                    const n = Math.round(Math.sqrt(Math.pow(t - i, 2) + Math.pow(e - s, 2)));
                    this.rulerChanged.next(n)
                }

                onPointsChanged(t) {
                    this.pointsChanged.next(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(Q))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })(), K = (() => {
            class t extends F {
                constructor(t, e, i, s, n, a) {
                    super(t), this.httpClient = t, this.motorDataService = e, this.motorDbService = i, this.linkService = s, this.rulerService = n, this.cameraSelectorService = a, this.inCalibrateModeSubject = new d.a(!1), this.inCalibrateMode = this.inCalibrateModeSubject.asObservable(), this.rulerValue = 0, this.pointsValue = [], this.width = 1790, this.distance = 6e4, this.operations = [], this.ngOnInit()
                }

                get isBusy() {
                    return this.isLoading || this.operations.length > 0
                }

                ngOnInit() {
                    this.subscriptions = [this.motorDbService.cameraInfo.subscribe(t => this.cameraInfo = t), this.rulerService.rulerChanged.subscribe(t => this.rulerValue = t), this.rulerService.pointsChanged.pipe(Object(V.a)(250)).subscribe(t => this.pointsValue = t)]
                }

                ngOnDestroy() {
                    this.subscriptions.forEach(t => t.unsubscribe())
                }

                getRequestOptions() {
                    return {
                        request: {
                            job: "execLib",
                            execLib: {type: "camera_calibrate", function: "getZoomCalibrateData", params: null}
                        }
                    }
                }

                async addPosition(t, e = null) {
                    if (this.motorDataService.motorZoom) {
                        const i = {
                            request: {
                                job: "execLib",
                                execLib: {
                                    type: "camera_calibrate",
                                    function: "addPosition",
                                    params: this.cameraInfo.zoomPos.toString() + "," + Math.round(t).toString()
                                }
                            }
                        };
                        this.operations.push("add"), this.httpClient.post(this.linkService.getApiUrl(), i, {withCredentials: !0}).subscribe(t => {
                            this.data = t.execLib.result, this.deleteOperation("add"), e && e()
                        })
                    }
                }

                async deletePosition(t, e = null) {
                    if (this.motorDataService.motorZoom) {
                        const i = {
                            request: {
                                job: "execLib",
                                execLib: {type: "camera_calibrate", function: "deletePosition", params: t}
                            }
                        };
                        this.operations.push("delete"), this.httpClient.post(this.linkService.getApiUrl(), i, {withCredentials: !0}).subscribe(t => {
                            !0 === t.exec.result && t.execLib.result && (this.data = t.execLib.result, this.deleteOperation("delete"), e && e())
                        })
                    }
                }

                deleteOperation(t) {
                    for (let e = 0; e < this.operations.length; e++) if (this.operations[e] === t) return void this.operations.splice(e, 1)
                }

                toggleShowCalibrateMode() {
                    const t = !this.inCalibrateModeSubject.getValue();
                    this.inCalibrateModeSubject.next(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(r.b), s.Sb(k), s.Sb(v), s.Sb(o), s.Sb($), s.Sb(S))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })();

        class tt {
            constructor(t = "") {
                this.value = t
            }

            append(t) {
                return this.value += "string" == typeof t ? t.toString() : String.fromCharCode(t), this
            }

            length() {
                return this.value.length
            }

            charAt(t) {
                return this.value.charAt(t)
            }

            deleteCharAt(t) {
                this.value = this.value.substr(0, t) + this.value.substring(t + 1)
            }

            setCharAt(t, e) {
                this.value = this.value.substr(0, t) + e + this.value.substr(t + 1)
            }

            toString() {
                return this.value
            }

            insert(t, e) {
                this.value = this.value.substr(0, t) + e + this.value.substr(t + e.length)
            }
        }

        class et extends Error {
            constructor(t = "") {
                super(t), this.message = t
            }
        }

        class it extends et {
        }

        var st = class {
            constructor(t, e) {
                this.width = t, this.height = e
            }

            getWidth() {
                return this.width
            }

            getHeight() {
                return this.height
            }

            isCropSupported() {
                return !1
            }

            crop(t, e, i, s) {
                throw new it("This luminance source does not support cropping.")
            }

            isRotateSupported() {
                return !1
            }

            rotateCounterClockwise() {
                throw new it("This luminance source does not support rotation by 90 degrees.")
            }

            rotateCounterClockwise45() {
                throw new it("This luminance source does not support rotation by 45 degrees.")
            }

            toString() {
                const t = new Uint8ClampedArray(this.width), e = new tt;
                for (let i = 0; i < this.height; i++) {
                    const s = this.getRow(i, t);
                    for (let t = 0; t < this.width; t++) {
                        const i = 255 & s[t];
                        let n;
                        n = i < 64 ? "#" : i < 128 ? "+" : i < 192 ? "." : " ", e.append(n)
                    }
                    e.append("\n")
                }
                return e.toString()
            }
        };

        class nt extends st {
            constructor(t) {
                super(t.getWidth(), t.getHeight()), this.delegate = t
            }

            getRow(t, e) {
                const i = this.delegate.getRow(t, e), s = this.getWidth();
                for (let n = 0; n < s; n++) i[n] = 255 - (255 & i[n]);
                return i
            }

            getMatrix() {
                const t = this.delegate.getMatrix(), e = this.getWidth() * this.getHeight(),
                    i = new Uint8ClampedArray(e);
                for (let s = 0; s < e; s++) i[s] = 255 - (255 & t[s]);
                return i
            }

            isCropSupported() {
                return this.delegate.isCropSupported()
            }

            crop(t, e, i, s) {
                return new nt(this.delegate.crop(t, e, i, s))
            }

            isRotateSupported() {
                return this.delegate.isRotateSupported()
            }

            invert() {
                return this.delegate
            }

            rotateCounterClockwise() {
                return new nt(this.delegate.rotateCounterClockwise())
            }

            rotateCounterClockwise45() {
                return new nt(this.delegate.rotateCounterClockwise45())
            }
        }

        class at extends et {
        }

        let rt = (() => {
            class t extends st {
                constructor(e, i = 70) {
                    super(e.width, e.height), this.canvas = e, this.tempCanvasElement = null, this.buffer = t.makeBufferFromCanvasImageData(e, i)
                }

                static makeBufferFromCanvasImageData(e, i = 70) {
                    const s = e.getContext("2d").getImageData(0, 0, e.width, e.height);
                    return t.toGrayscaleBuffer(s.data, e.width, e.height, i)
                }

                static toGrayscaleBuffer(t, e, i, s = 70) {
                    const n = new Uint8ClampedArray(e * i);
                    for (let a = 0, r = 0, o = t.length; a < o; a += 4, r++) {
                        let e;
                        0 === t[a + 3] ? e = 255 : (e = (t[a] + t[a + 1] + t[a + 2]) / 3, e > s && (e = 255)), n[r] = e
                    }
                    return n
                }

                getRow(t, e) {
                    if (t < 0 || t >= this.getHeight()) throw new at("Requested row is outside the image: " + t);
                    const i = this.getWidth(), s = t * i;
                    return null === e ? e = this.buffer.slice(s, s + i) : (e.length < i && (e = new Uint8ClampedArray(i)), e.set(this.buffer.slice(s, s + i))), e
                }

                getMatrix() {
                    return this.buffer
                }

                isCropSupported() {
                    return !0
                }

                crop(t, e, i, s) {
                    return this.crop(t, e, i, s), this
                }

                isRotateSupported() {
                    return !0
                }

                rotateCounterClockwise() {
                    return this.rotate(-90), this
                }

                rotateCounterClockwise45() {
                    return this.rotate(-45), this
                }

                getTempCanvasElement() {
                    if (null === this.tempCanvasElement) {
                        const t = this.canvas.ownerDocument.createElement("canvas");
                        t.style.width = `${this.canvas.width}px`, t.style.height = `${this.canvas.height}px`, this.tempCanvasElement = t
                    }
                    return this.tempCanvasElement
                }

                rotate(e) {
                    const i = this.getTempCanvasElement(), s = i.getContext("2d");
                    return s.rotate(e * t.DEGREE_TO_RADIANS), s.drawImage(this.canvas, 0, 0), this.buffer = t.makeBufferFromCanvasImageData(i), this
                }

                invert() {
                    return new nt(this)
                }

                getBuffer() {
                    return this.buffer
                }
            }

            return t.DEGREE_TO_RADIANS = Math.PI / 180, t
        })();

        class ot {
            constructor(t) {
                if (this.binarizer = t, null === t) throw new at("Binarizer must be non-null.")
            }

            getWidth() {
                return this.binarizer.getWidth()
            }

            getHeight() {
                return this.binarizer.getHeight()
            }

            getBlackRow(t, e) {
                return this.binarizer.getBlackRow(t, e)
            }

            getBlackMatrix() {
                return null == this.matrix && (this.matrix = this.binarizer.getBlackMatrix()), this.matrix
            }

            isCropSupported() {
                return this.binarizer.getLuminanceSource().isCropSupported()
            }

            crop(t, e, i, s) {
                const n = this.binarizer.getLuminanceSource().crop(t, e, i, s);
                return new ot(this.binarizer.createBinarizer(n))
            }

            isRotateSupported() {
                return this.binarizer.getLuminanceSource().isRotateSupported()
            }

            rotateCounterClockwise() {
                const t = this.binarizer.getLuminanceSource().rotateCounterClockwise();
                return new ot(this.binarizer.createBinarizer(t))
            }

            rotateCounterClockwise45() {
                const t = this.binarizer.getLuminanceSource().rotateCounterClockwise45();
                return new ot(this.binarizer.createBinarizer(t))
            }

            toString() {
                try {
                    return this.getBlackMatrix().toString()
                } catch (t) {
                    return ""
                }
            }
        }

        class ct {
            static arraycopy(t, e, i, s, n) {
                for (; n--;) i[s++] = t[e++]
            }

            static currentTimeMillis() {
                return Date.now()
            }
        }

        var lt = (() => {
            class t {
                static numberOfTrailingZeros(t) {
                    let e;
                    if (0 === t) return 32;
                    let i = 31;
                    return e = t << 16, 0 !== e && (i -= 16, t = e), e = t << 8, 0 !== e && (i -= 8, t = e), e = t << 4, 0 !== e && (i -= 4, t = e), e = t << 2, 0 !== e && (i -= 2, t = e), i - (t << 1 >>> 31)
                }

                static numberOfLeadingZeros(t) {
                    if (0 === t) return 32;
                    let e = 1;
                    return t >>> 16 == 0 && (e += 16, t <<= 16), t >>> 24 == 0 && (e += 8, t <<= 8), t >>> 28 == 0 && (e += 4, t <<= 4), t >>> 30 == 0 && (e += 2, t <<= 2), e -= t >>> 31, e
                }

                static toHexString(t) {
                    return t.toString(16)
                }

                static bitCount(t) {
                    return t = (t = (858993459 & (t -= t >>> 1 & 1431655765)) + (t >>> 2 & 858993459)) + (t >>> 4) & 252645135, 63 & (t += t >>> 8) + (t >>> 16)
                }
            }

            return t.MIN_VALUE_32_BITS = -2147483648, t
        })();

        class ht {
            static equals(t, e) {
                if (!t) return !1;
                if (!e) return !1;
                if (!t.length) return !1;
                if (!e.length) return !1;
                if (t.length !== e.length) return !1;
                for (let i = 0, s = t.length; i < s; i++) if (t[i] !== e[i]) return !1;
                return !0
            }

            static hashCode(t) {
                if (null === t) return 0;
                let e = 1;
                for (const i of t) e = 31 * e + i;
                return e
            }

            static fillUint8Array(t, e) {
                for (let i = 0; i !== t.length; i++) t[i] = e
            }

            static copyOf(t, e) {
                const i = new Int32Array(e);
                return ct.arraycopy(t, 0, i, 0, Math.min(t.length, e)), i
            }

            static binarySearch(t, e, i) {
                void 0 === i && (i = ht.numberComparator);
                let s = 0, n = t.length - 1;
                for (; s <= n;) {
                    const a = n + s >> 1, r = i(e, t[a]);
                    if (r > 0) s = a + 1; else {
                        if (!(r < 0)) return a;
                        n = a - 1
                    }
                }
                return -s - 1
            }

            static numberComparator(t, e) {
                return t - e
            }
        }

        class ut {
            constructor(t, e) {
                void 0 === t ? (this.size = 0, this.bits = new Int32Array(1)) : (this.size = t, this.bits = null == e ? ut.makeArray(t) : e)
            }

            getSize() {
                return this.size
            }

            getSizeInBytes() {
                return Math.floor((this.size + 7) / 8)
            }

            ensureCapacity(t) {
                if (t > 32 * this.bits.length) {
                    const e = ut.makeArray(t);
                    ct.arraycopy(this.bits, 0, e, 0, this.bits.length), this.bits = e
                }
            }

            get(t) {
                return 0 != (this.bits[Math.floor(t / 32)] & 1 << (31 & t))
            }

            set(t) {
                this.bits[Math.floor(t / 32)] |= 1 << (31 & t)
            }

            flip(t) {
                this.bits[Math.floor(t / 32)] ^= 1 << (31 & t)
            }

            getNextSet(t) {
                const e = this.size;
                if (t >= e) return e;
                const i = this.bits;
                let s = Math.floor(t / 32), n = i[s];
                n &= ~((1 << (31 & t)) - 1);
                const a = i.length;
                for (; 0 === n;) {
                    if (++s === a) return e;
                    n = i[s]
                }
                const r = 32 * s + lt.numberOfTrailingZeros(n);
                return r > e ? e : r
            }

            getNextUnset(t) {
                const e = this.size;
                if (t >= e) return e;
                const i = this.bits;
                let s = Math.floor(t / 32), n = ~i[s];
                n &= ~((1 << (31 & t)) - 1);
                const a = i.length;
                for (; 0 === n;) {
                    if (++s === a) return e;
                    n = ~i[s]
                }
                const r = 32 * s + lt.numberOfTrailingZeros(n);
                return r > e ? e : r
            }

            setBulk(t, e) {
                this.bits[Math.floor(t / 32)] = e
            }

            setRange(t, e) {
                if (e < t || t < 0 || e > this.size) throw new at;
                if (e === t) return;
                e--;
                const i = Math.floor(t / 32), s = Math.floor(e / 32), n = this.bits;
                for (let a = i; a <= s; a++) n[a] |= (2 << (a < s ? 31 : 31 & e)) - (1 << (a > i ? 0 : 31 & t))
            }

            clear() {
                const t = this.bits.length, e = this.bits;
                for (let i = 0; i < t; i++) e[i] = 0
            }

            isRange(t, e, i) {
                if (e < t || t < 0 || e > this.size) throw new at;
                if (e === t) return !0;
                e--;
                const s = Math.floor(t / 32), n = Math.floor(e / 32), a = this.bits;
                for (let r = s; r <= n; r++) {
                    const o = (2 << (r < n ? 31 : 31 & e)) - (1 << (r > s ? 0 : 31 & t)) & 4294967295;
                    if ((a[r] & o) !== (i ? o : 0)) return !1
                }
                return !0
            }

            appendBit(t) {
                this.ensureCapacity(this.size + 1), t && (this.bits[Math.floor(this.size / 32)] |= 1 << (31 & this.size)), this.size++
            }

            appendBits(t, e) {
                if (e < 0 || e > 32) throw new at("Num bits must be between 0 and 32");
                this.ensureCapacity(this.size + e);
                for (let i = e; i > 0; i--) this.appendBit(1 == (t >> i - 1 & 1))
            }

            appendBitArray(t) {
                const e = t.size;
                this.ensureCapacity(this.size + e);
                for (let i = 0; i < e; i++) this.appendBit(t.get(i))
            }

            xor(t) {
                if (this.size !== t.size) throw new at("Sizes don't match");
                const e = this.bits;
                for (let i = 0, s = e.length; i < s; i++) e[i] ^= t.bits[i]
            }

            toBytes(t, e, i, s) {
                for (let n = 0; n < s; n++) {
                    let s = 0;
                    for (let e = 0; e < 8; e++) this.get(t) && (s |= 1 << 7 - e), t++;
                    e[i + n] = s
                }
            }

            getBitArray() {
                return this.bits
            }

            reverse() {
                const t = new Int32Array(this.bits.length), e = Math.floor((this.size - 1) / 32), i = e + 1,
                    s = this.bits;
                for (let n = 0; n < i; n++) {
                    let i = s[n];
                    i = i >> 1 & 1431655765 | (1431655765 & i) << 1, i = i >> 2 & 858993459 | (858993459 & i) << 2, i = i >> 4 & 252645135 | (252645135 & i) << 4, i = i >> 8 & 16711935 | (16711935 & i) << 8, i = i >> 16 & 65535 | (65535 & i) << 16, t[e - n] = i
                }
                if (this.size !== 32 * i) {
                    const e = 32 * i - this.size;
                    let s = t[0] >>> e;
                    for (let n = 1; n < i; n++) {
                        const i = t[n];
                        s |= i << 32 - e, t[n - 1] = s, s = i >>> e
                    }
                    t[i - 1] = s
                }
                this.bits = t
            }

            static makeArray(t) {
                return new Int32Array(Math.floor((t + 31) / 32))
            }

            equals(t) {
                return t instanceof ut && this.size === t.size && ht.equals(this.bits, t.bits)
            }

            hashCode() {
                return 31 * this.size + ht.hashCode(this.bits)
            }

            toString() {
                let t = "";
                for (let e = 0, i = this.size; e < i; e++) 0 == (7 & e) && (t += " "), t += this.get(e) ? "X" : ".";
                return t
            }

            clone() {
                return new ut(this.size, this.bits.slice())
            }
        }

        class dt {
            constructor(t, e, i, s) {
                if (this.width = t, this.height = e, this.rowSize = i, this.bits = s, null == e && (e = t), this.height = e, t < 1 || e < 1) throw new at("Both dimensions must be greater than 0");
                null == i && (i = Math.floor((t + 31) / 32)), this.rowSize = i, null == s && (this.bits = new Int32Array(this.rowSize * this.height))
            }

            static parseFromBooleanArray(t) {
                const e = t.length, i = t[0].length, s = new dt(i, e);
                for (let n = 0; n < e; n++) {
                    const e = t[n];
                    for (let t = 0; t < i; t++) e[t] && s.set(t, n)
                }
                return s
            }

            static parseFromString(t, e, i) {
                if (null === t) throw new at("stringRepresentation cannot be null");
                const s = new Array(t.length);
                let n = 0, a = 0, r = -1, o = 0, c = 0;
                for (; c < t.length;) if ("\n" === t.charAt(c) || "\r" === t.charAt(c)) {
                    if (n > a) {
                        if (-1 === r) r = n - a; else if (n - a !== r) throw new at("row lengths do not match");
                        a = n, o++
                    }
                    c++
                } else if (t.substring(c, c + e.length) === e) c += e.length, s[n] = !0, n++; else {
                    if (t.substring(c, c + i.length) !== i) throw new at("illegal character encountered: " + t.substring(c));
                    c += i.length, s[n] = !1, n++
                }
                if (n > a) {
                    if (-1 === r) r = n - a; else if (n - a !== r) throw new at("row lengths do not match");
                    o++
                }
                const l = new dt(r, o);
                for (let h = 0; h < n; h++) s[h] && l.set(Math.floor(h % r), Math.floor(h / r));
                return l
            }

            get(t, e) {
                const i = e * this.rowSize + Math.floor(t / 32);
                return 0 != (this.bits[i] >>> (31 & t) & 1)
            }

            set(t, e) {
                const i = e * this.rowSize + Math.floor(t / 32);
                this.bits[i] |= 1 << (31 & t) & 4294967295
            }

            unset(t, e) {
                const i = e * this.rowSize + Math.floor(t / 32);
                this.bits[i] &= ~(1 << (31 & t) & 4294967295)
            }

            flip(t, e) {
                const i = e * this.rowSize + Math.floor(t / 32);
                this.bits[i] ^= 1 << (31 & t) & 4294967295
            }

            xor(t) {
                if (this.width !== t.getWidth() || this.height !== t.getHeight() || this.rowSize !== t.getRowSize()) throw new at("input matrix dimensions do not match");
                const e = new ut(Math.floor(this.width / 32) + 1), i = this.rowSize, s = this.bits;
                for (let n = 0, a = this.height; n < a; n++) {
                    const a = n * i, r = t.getRow(n, e).getBitArray();
                    for (let t = 0; t < i; t++) s[a + t] ^= r[t]
                }
            }

            clear() {
                const t = this.bits, e = t.length;
                for (let i = 0; i < e; i++) t[i] = 0
            }

            setRegion(t, e, i, s) {
                if (e < 0 || t < 0) throw new at("Left and top must be nonnegative");
                if (s < 1 || i < 1) throw new at("Height and width must be at least 1");
                const n = t + i, a = e + s;
                if (a > this.height || n > this.width) throw new at("The region must fit inside the matrix");
                const r = this.rowSize, o = this.bits;
                for (let c = e; c < a; c++) {
                    const e = c * r;
                    for (let i = t; i < n; i++) o[e + Math.floor(i / 32)] |= 1 << (31 & i) & 4294967295
                }
            }

            getRow(t, e) {
                null == e || e.getSize() < this.width ? e = new ut(this.width) : e.clear();
                const i = this.rowSize, s = this.bits, n = t * i;
                for (let a = 0; a < i; a++) e.setBulk(32 * a, s[n + a]);
                return e
            }

            setRow(t, e) {
                ct.arraycopy(e.getBitArray(), 0, this.bits, t * this.rowSize, this.rowSize)
            }

            rotate180() {
                const t = this.getWidth(), e = this.getHeight();
                let i = new ut(t), s = new ut(t);
                for (let n = 0, a = Math.floor((e + 1) / 2); n < a; n++) i = this.getRow(n, i), s = this.getRow(e - 1 - n, s), i.reverse(), s.reverse(), this.setRow(n, s), this.setRow(e - 1 - n, i)
            }

            getEnclosingRectangle() {
                const t = this.height, e = this.rowSize, i = this.bits;
                let s = this.width, n = t, a = -1, r = -1;
                for (let o = 0; o < t; o++) for (let t = 0; t < e; t++) {
                    const c = i[o * e + t];
                    if (0 !== c) {
                        if (o < n && (n = o), o > r && (r = o), 32 * t < s) {
                            let e = 0;
                            for (; 0 == (c << 31 - e & 4294967295);) e++;
                            32 * t + e < s && (s = 32 * t + e)
                        }
                        if (32 * t + 31 > a) {
                            let e = 31;
                            for (; c >>> e == 0;) e--;
                            32 * t + e > a && (a = 32 * t + e)
                        }
                    }
                }
                return a < s || r < n ? null : Int32Array.from([s, n, a - s + 1, r - n + 1])
            }

            getTopLeftOnBit() {
                const t = this.rowSize, e = this.bits;
                let i = 0;
                for (; i < e.length && 0 === e[i];) i++;
                if (i === e.length) return null;
                const s = i / t;
                let n = i % t * 32;
                const a = e[i];
                let r = 0;
                for (; 0 == (a << 31 - r & 4294967295);) r++;
                return n += r, Int32Array.from([n, s])
            }

            getBottomRightOnBit() {
                const t = this.rowSize, e = this.bits;
                let i = e.length - 1;
                for (; i >= 0 && 0 === e[i];) i--;
                if (i < 0) return null;
                const s = Math.floor(i / t);
                let n = 32 * Math.floor(i % t);
                const a = e[i];
                let r = 31;
                for (; a >>> r == 0;) r--;
                return n += r, Int32Array.from([n, s])
            }

            getWidth() {
                return this.width
            }

            getHeight() {
                return this.height
            }

            getRowSize() {
                return this.rowSize
            }

            equals(t) {
                return t instanceof dt && this.width === t.width && this.height === t.height && this.rowSize === t.rowSize && ht.equals(this.bits, t.bits)
            }

            hashCode() {
                let t = this.width;
                return t = 31 * t + this.width, t = 31 * t + this.height, t = 31 * t + this.rowSize, t = 31 * t + ht.hashCode(this.bits), t
            }

            toString(t = "x", e = " ", i = "\n") {
                return this.buildToString(t, e, i)
            }

            buildToString(t, e, i) {
                let s = new tt;
                s.append(i);
                for (let n = 0, a = this.height; n < a; n++) {
                    for (let i = 0, a = this.width; i < a; i++) s.append(this.get(i, n) ? t : e);
                    s.append(i)
                }
                return s.toString()
            }

            clone() {
                return new dt(this.width, this.height, this.rowSize, this.bits.slice())
            }
        }

        class mt extends et {
        }

        var bt = (() => {
            class t extends class {
                constructor(t) {
                    this.source = t
                }

                getLuminanceSource() {
                    return this.source
                }

                getWidth() {
                    return this.source.getWidth()
                }

                getHeight() {
                    return this.source.getHeight()
                }
            } {
                constructor(e) {
                    super(e), this.luminances = t.EMPTY, this.buckets = new Int32Array(t.LUMINANCE_BUCKETS)
                }

                getBlackRow(e, i) {
                    const s = this.getLuminanceSource(), n = s.getWidth();
                    null == i || i.getSize() < n ? i = new ut(n) : i.clear(), this.initArrays(n);
                    const a = s.getRow(e, this.luminances), r = this.buckets;
                    for (let c = 0; c < n; c++) r[(255 & a[c]) >> t.LUMINANCE_SHIFT]++;
                    const o = t.estimateBlackPoint(r);
                    if (n < 3) for (let t = 0; t < n; t++) (255 & a[t]) < o && i.set(t); else {
                        let t = 255 & a[0], e = 255 & a[1];
                        for (let s = 1; s < n - 1; s++) {
                            const n = 255 & a[s + 1];
                            (4 * e - t - n) / 2 < o && i.set(s), t = e, e = n
                        }
                    }
                    return i
                }

                getBlackMatrix() {
                    const e = this.getLuminanceSource(), i = e.getWidth(), s = e.getHeight(), n = new dt(i, s);
                    this.initArrays(i);
                    const a = this.buckets;
                    for (let c = 1; c < 5; c++) {
                        const n = e.getRow(s * c / 5, this.luminances), r = Math.floor(4 * i / 5);
                        for (let e = Math.floor(i / 5); e < r; e++) a[(255 & n[e]) >> t.LUMINANCE_SHIFT]++
                    }
                    const r = t.estimateBlackPoint(a), o = e.getMatrix();
                    for (let t = 0; t < s; t++) {
                        const e = t * i;
                        for (let s = 0; s < i; s++) (255 & o[e + s]) < r && n.set(s, t)
                    }
                    return n
                }

                createBinarizer(e) {
                    return new t(e)
                }

                initArrays(e) {
                    this.luminances.length < e && (this.luminances = new Uint8ClampedArray(e));
                    const i = this.buckets;
                    for (let s = 0; s < t.LUMINANCE_BUCKETS; s++) i[s] = 0
                }

                static estimateBlackPoint(e) {
                    const i = e.length;
                    let s = 0, n = 0, a = 0;
                    for (let t = 0; t < i; t++) e[t] > a && (n = t, a = e[t]), e[t] > s && (s = e[t]);
                    let r = 0, o = 0;
                    for (let t = 0; t < i; t++) {
                        const i = t - n, s = e[t] * i * i;
                        s > o && (r = t, o = s)
                    }
                    if (n > r) {
                        const t = n;
                        n = r, r = t
                    }
                    if (r - n <= i / 16) throw new mt;
                    let c = r - 1, l = -1;
                    for (let t = r - 1; t > n; t--) {
                        const i = t - n, a = i * i * (r - t) * (s - e[t]);
                        a > l && (c = t, l = a)
                    }
                    return c << t.LUMINANCE_SHIFT
                }
            }

            return t.LUMINANCE_BITS = 5, t.LUMINANCE_SHIFT = 8 - t.LUMINANCE_BITS, t.LUMINANCE_BUCKETS = 1 << t.LUMINANCE_BITS, t.EMPTY = Uint8ClampedArray.from([0]), t
        })(), gt = (() => {
            class t extends bt {
                constructor(t) {
                    super(t), this.matrix = null
                }

                getBlackMatrix() {
                    if (null !== this.matrix) return this.matrix;
                    const e = this.getLuminanceSource(), i = e.getWidth(), s = e.getHeight();
                    if (i >= t.MINIMUM_DIMENSION && s >= t.MINIMUM_DIMENSION) {
                        const n = e.getMatrix();
                        let a = i >> t.BLOCK_SIZE_POWER;
                        0 != (i & t.BLOCK_SIZE_MASK) && a++;
                        let r = s >> t.BLOCK_SIZE_POWER;
                        0 != (s & t.BLOCK_SIZE_MASK) && r++;
                        const o = t.calculateBlackPoints(n, a, r, i, s), c = new dt(i, s);
                        t.calculateThresholdForBlock(n, a, r, i, s, o, c), this.matrix = c
                    } else this.matrix = super.getBlackMatrix();
                    return this.matrix
                }

                createBinarizer(e) {
                    return new t(e)
                }

                static calculateThresholdForBlock(e, i, s, n, a, r, o) {
                    const c = a - t.BLOCK_SIZE, l = n - t.BLOCK_SIZE;
                    for (let h = 0; h < s; h++) {
                        let a = h << t.BLOCK_SIZE_POWER;
                        a > c && (a = c);
                        const u = t.cap(h, 2, s - 3);
                        for (let s = 0; s < i; s++) {
                            let c = s << t.BLOCK_SIZE_POWER;
                            c > l && (c = l);
                            const h = t.cap(s, 2, i - 3);
                            let d = 0;
                            for (let t = -2; t <= 2; t++) {
                                const e = r[u + t];
                                d += e[h - 2] + e[h - 1] + e[h] + e[h + 1] + e[h + 2]
                            }
                            t.thresholdBlock(e, c, a, d / 25, n, o)
                        }
                    }
                }

                static cap(t, e, i) {
                    return t < e ? e : t > i ? i : t
                }

                static thresholdBlock(e, i, s, n, a, r) {
                    for (let o = 0, c = s * a + i; o < t.BLOCK_SIZE; o++, c += a) for (let a = 0; a < t.BLOCK_SIZE; a++) (255 & e[c + a]) <= n && r.set(i + a, s + o)
                }

                static calculateBlackPoints(e, i, s, n, a) {
                    const r = a - t.BLOCK_SIZE, o = n - t.BLOCK_SIZE, c = new Array(s);
                    for (let l = 0; l < s; l++) {
                        c[l] = new Int32Array(i);
                        let s = l << t.BLOCK_SIZE_POWER;
                        s > r && (s = r);
                        for (let a = 0; a < i; a++) {
                            let i = a << t.BLOCK_SIZE_POWER;
                            i > o && (i = o);
                            let r = 0, h = 255, u = 0;
                            for (let a = 0, o = s * n + i; a < t.BLOCK_SIZE; a++, o += n) {
                                for (let i = 0; i < t.BLOCK_SIZE; i++) {
                                    const t = 255 & e[o + i];
                                    r += t, t < h && (h = t), t > u && (u = t)
                                }
                                if (u - h > t.MIN_DYNAMIC_RANGE) for (a++, o += n; a < t.BLOCK_SIZE; a++, o += n) for (let i = 0; i < t.BLOCK_SIZE; i++) r += 255 & e[o + i]
                            }
                            let d = r >> 2 * t.BLOCK_SIZE_POWER;
                            if (u - h <= t.MIN_DYNAMIC_RANGE && (d = h / 2, l > 0 && a > 0)) {
                                const t = (c[l - 1][a] + 2 * c[l][a - 1] + c[l - 1][a - 1]) / 4;
                                h < t && (d = t)
                            }
                            c[l][a] = d
                        }
                    }
                    return c
                }
            }

            return t.BLOCK_SIZE_POWER = 3, t.BLOCK_SIZE = 1 << t.BLOCK_SIZE_POWER, t.BLOCK_SIZE_MASK = t.BLOCK_SIZE - 1, t.MINIMUM_DIMENSION = 5 * t.BLOCK_SIZE, t.MIN_DYNAMIC_RANGE = 24, t
        })();

        class ft extends et {
        }

        class pt extends et {
        }

        class St extends et {
        }

        class vt {
            constructor(t, e = 500, i, s, n = 70) {
                this.reader = t, this.timeBetweenScansMillis = e, this.hints = i, this.position = s, this.greyLevel = n
            }

            decodeFromImage(t, e) {
                if (void 0 === t && void 0 === e) throw new ft("either imageElement with a src set or an url must be provided");
                this.prepareImageElement(t);
                const i = this;
                return new Promise((t, s) => {
                    if (void 0 !== e) i.imageLoadedEventListener = () => {
                        i.decodeOnce(t, s, !1, !0)
                    }, i.imageElement.addEventListener("load", i.imageLoadedEventListener), i.imageElement.src = e; else {
                        if (!this.imageElement) throw new ft("either src or a loaded img should be provided");
                        this.isImageLoaded(this.imageElement) ? i.decodeOnce(t, s, !1, !0) : this.imageElement.addEventListener("load", e => i.decodeOnce(t, s, !1, !0))
                    }
                })
            }

            isImageLoaded(t) {
                return !!t.complete && 0 !== t.naturalWidth
            }

            prepareImageElement(t) {
                if (void 0 === t) this.imageElement = document.createElement("img"), this.imageElement.width = 100, this.imageElement.height = 100; else if ("string" == typeof t) console.log("not worked", this); else if (void 0 === this.position) this.imageElement = t; else {
                    const e = document.createElement("canvas");
                    e.width = t.naturalWidth, e.height = t.naturalHeight, e.getContext("2d").drawImage(t, 0, 0);
                    const i = document.createElement("img");
                    i.width = t.naturalWidth, i.height = t.naturalHeight, this.imageElement = document.createElement("img"), this.imageElement.width = this.position.width, this.imageElement.height = this.position.height, i.addEventListener("load", () => {
                        const t = document.createElement("canvas");
                        t.width = this.position.width, t.height = this.position.height, t.getContext("2d").drawImage(i, Math.trunc(this.position.x), Math.trunc(this.position.y), Math.trunc(this.position.width), Math.trunc(this.position.height), 0, 0, Math.trunc(this.position.width), Math.trunc(this.position.height)), this.imageElement.src = t.toDataURL()
                    }), i.src = e.toDataURL()
                }
            }

            decodeOnceWithDelay(t, e) {
                this.timeoutHandler = window.setTimeout(this.decodeOnce.bind(this, t, e), this.timeBetweenScansMillis)
            }

            decodeOnce(t, e, i = !0, s = !0) {
                void 0 === this.canvasElementContext && this.prepareCaptureCanvas(), this.drawImageOnCanvas(this.canvasElementContext, this.videoElement || this.imageElement);
                const n = new rt(this.canvasElement, this.greyLevel), a = new ot(new gt(n));
                let r;
                if (r = document.getElementById("debug_browser_code")) {
                    const t = n.getBuffer(), e = document.createElement("canvas");
                    e.width = this.canvasElement.width, e.height = this.canvasElement.height;
                    const i = e.getContext("2d"), s = new Uint8ClampedArray(4 * e.width * e.height);
                    t.forEach((t, e) => {
                        s[4 * e] = s[4 * e + 1] = s[4 * e + 2] = t, s[4 * e + 3] = 255
                    }), i.putImageData(new ImageData(s, e.width, e.height), 0, 0), r.innerHTML = "", r.appendChild(e), r.appendChild(this.imageElement)
                }
                try {
                    t(this.readerDecode(a))
                } catch (o) {
                    i && o instanceof mt || s && (o instanceof pt || o instanceof St) ? this.decodeOnceWithDelay(t, e) : e(o)
                }
            }

            drawImageOnCanvas(t, e) {
                t.drawImage(e, 0, 0)
            }

            readerDecode(t) {
                return this.reader.decode(t, this.hints)
            }

            prepareCaptureCanvas() {
                const t = document.createElement("canvas");
                let e, i;
                e = this.imageElement.naturalWidth || this.imageElement.width, i = this.imageElement.naturalHeight || this.imageElement.height, t.style.width = `${e}px`, t.style.height = `${i}px`, t.width = e, t.height = i, this.canvasElement = t, this.canvasElementContext = t.getContext("2d")
            }
        }

        var wt = function (t) {
            return t[t.AZTEC = 0] = "AZTEC", t[t.CODABAR = 1] = "CODABAR", t[t.CODE_39 = 2] = "CODE_39", t[t.CODE_93 = 3] = "CODE_93", t[t.CODE_128 = 4] = "CODE_128", t[t.DATA_MATRIX = 5] = "DATA_MATRIX", t[t.EAN_8 = 6] = "EAN_8", t[t.EAN_13 = 7] = "EAN_13", t[t.ITF = 8] = "ITF", t[t.MAXICODE = 9] = "MAXICODE", t[t.PDF_417 = 10] = "PDF_417", t[t.QR_CODE = 11] = "QR_CODE", t[t.RSS_14 = 12] = "RSS_14", t[t.RSS_EXPANDED = 13] = "RSS_EXPANDED", t[t.UPC_A = 14] = "UPC_A", t[t.UPC_E = 15] = "UPC_E", t[t.UPC_EAN_EXTENSION = 16] = "UPC_EAN_EXTENSION", t
        }({});

        class xt {
            static floatToIntBits(t) {
                return t
            }
        }

        class Ct {
            constructor(t, e) {
                this.x = t, this.y = e
            }

            getX() {
                return this.x
            }

            getY() {
                return this.y
            }

            equals(t) {
                if (t instanceof Ct) {
                    const e = t;
                    return this.x === e.x && this.y === e.y
                }
                return !1
            }

            hashCode() {
                return 31 * xt.floatToIntBits(this.x) + xt.floatToIntBits(this.y)
            }

            toString() {
                return "(" + this.x + "," + this.y + ")"
            }

            static orderBestPatterns(t) {
                const e = this.distance(t[0], t[1]), i = this.distance(t[1], t[2]), s = this.distance(t[0], t[2]);
                let n, a, r;
                if (i >= e && i >= s ? (a = t[0], n = t[1], r = t[2]) : s >= i && s >= e ? (a = t[1], n = t[0], r = t[2]) : (a = t[2], n = t[0], r = t[1]), this.crossProductZ(n, a, r) < 0) {
                    const t = n;
                    n = r, r = t
                }
                t[0] = n, t[1] = a, t[2] = r
            }

            static distance(t, e) {
                return class {
                    MathUtils() {
                    }

                    static round(t) {
                        return NaN === t ? 0 : t <= Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : t >= Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : t + (t < 0 ? -.5 : .5) | 0
                    }

                    static distance(t, e, i, s) {
                        const n = t - i, a = e - s;
                        return Math.sqrt(n * n + a * a)
                    }

                    static sum(t) {
                        let e = 0;
                        for (let i = 0, s = t.length; i !== s; i++) e += t[i];
                        return e
                    }
                }.distance(t.x, t.y, e.x, e.y)
            }

            static crossProductZ(t, e, i) {
                const s = e.x, n = e.y;
                return (i.x - s) * (t.y - n) - (i.y - n) * (t.x - s)
            }
        }

        class yt {
            constructor(t, e, i, s, n, a) {
                this.text = t, this.rawBytes = e, this.numBits = i, this.resultPoints = s, this.format = n, this.timestamp = a, this.text = t, this.rawBytes = e, this.numBits = null == i ? null == e ? 0 : 8 * e.length : i, this.resultPoints = s, this.format = n, this.resultMetadata = null, this.timestamp = null == a ? ct.currentTimeMillis() : a
            }

            getText() {
                return this.text
            }

            getRawBytes() {
                return this.rawBytes
            }

            getNumBits() {
                return this.numBits
            }

            getResultPoints() {
                return this.resultPoints
            }

            getBarcodeFormat() {
                return this.format
            }

            getResultMetadata() {
                return this.resultMetadata
            }

            putMetadata(t, e) {
                null === this.resultMetadata && (this.resultMetadata = new Map), this.resultMetadata.set(t, e)
            }

            putAllMetadata(t) {
                null !== t && (this.resultMetadata = null === this.resultMetadata ? t : new Map(t))
            }

            addResultPoints(t) {
                const e = this.resultPoints;
                if (null === e) this.resultPoints = t; else if (null !== t && t.length > 0) {
                    const i = new Ct[e.length + t.length];
                    ct.arraycopy(e, 0, i, 0, e.length), ct.arraycopy(t, 0, i, e.length, t.length), this.resultPoints = i
                }
            }

            getTimestamp() {
                return this.timestamp
            }

            toString() {
                return this.text
            }
        }

        var Ot = function (t) {
            return t[t.OTHER = 0] = "OTHER", t[t.ORIENTATION = 1] = "ORIENTATION", t[t.BYTE_SEGMENTS = 2] = "BYTE_SEGMENTS", t[t.ERROR_CORRECTION_LEVEL = 3] = "ERROR_CORRECTION_LEVEL", t[t.ISSUE_NUMBER = 4] = "ISSUE_NUMBER", t[t.SUGGESTED_PRICE = 5] = "SUGGESTED_PRICE", t[t.POSSIBLE_COUNTRY = 6] = "POSSIBLE_COUNTRY", t[t.UPC_EAN_EXTENSION = 7] = "UPC_EAN_EXTENSION", t[t.PDF417_EXTRA_METADATA = 8] = "PDF417_EXTRA_METADATA", t[t.STRUCTURED_APPEND_SEQUENCE = 9] = "STRUCTURED_APPEND_SEQUENCE", t[t.STRUCTURED_APPEND_PARITY = 10] = "STRUCTURED_APPEND_PARITY", t
        }({});

        class It {
            decode(t, e) {
                try {
                    return this.doDecode(t, e)
                } catch (i) {
                    if (e && !0 === e.get(3) && t.isRotateSupported()) {
                        const i = t.rotateCounterClockwise(), s = this.doDecode(i, e), n = s.getResultMetadata();
                        let a = 270;
                        null !== n && !0 === n.get(Ot.ORIENTATION) && (a += n.get(Ot.ORIENTATION) % 360), s.putMetadata(Ot.ORIENTATION, a);
                        const r = s.getResultPoints();
                        if (null !== r) {
                            const t = i.getHeight();
                            for (let e = 0; e < r.length; e++) r[e] = new Ct(t - r[e].getY() - 1, r[e].getX())
                        }
                        return s
                    }
                    throw new mt
                }
            }

            reset() {
            }

            doDecode(t, e) {
                const i = t.getWidth(), s = t.getHeight();
                let n = new ut(i);
                const a = e && !0 === e.get(3), r = Math.max(1, s >> (a ? 8 : 5));
                let o;
                o = a ? s : 15;
                const c = Math.trunc(s / 2);
                for (let u = 0; u < o; u++) {
                    const a = Math.trunc((u + 1) / 2), o = c + r * (0 == (1 & u) ? a : -a);
                    if (o < 0 || o >= s) break;
                    try {
                        n = t.getBlackRow(o, n)
                    } catch (l) {
                        continue
                    }
                    for (let t = 0; t < 2; t++) {
                        if (1 === t && (n.reverse(), e && !0 === e.get(9))) {
                            const t = new Map;
                            e.forEach((e, i) => t.set(i, e)), t.delete(9), e = t
                        }
                        try {
                            const s = this.decodeRow(o, n, e);
                            if (1 === t) {
                                s.putMetadata(Ot.ORIENTATION, 180);
                                const t = s.getResultPoints();
                                null !== t && (t[0] = new Ct(i - t[0].getX() - 1, t[0].getY()), t[1] = new Ct(i - t[1].getX() - 1, t[1].getY()))
                            }
                            return s
                        } catch (h) {
                        }
                    }
                }
                throw new mt
            }

            static recordPattern(t, e, i) {
                const s = i.length;
                for (let c = 0; c < s; c++) i[c] = 0;
                const n = t.getSize();
                if (e >= n) throw new mt;
                let a = !t.get(e), r = 0, o = e;
                for (; o < n;) {
                    if (t.get(o) !== a) i[r]++; else {
                        if (++r === s) break;
                        i[r] = 1, a = !a
                    }
                    o++
                }
                if (r !== s && (r !== s - 1 || o !== n)) throw new mt
            }

            static recordPatternInReverse(t, e, i) {
                let s = i.length, n = t.get(e);
                for (; e > 0 && s >= 0;) t.get(--e) !== n && (s--, n = !n);
                if (s >= 0) throw new mt;
                It.recordPattern(t, e + 1, i)
            }

            static patternMatchVariance(t, e, i) {
                const s = t.length;
                let n = 0, a = 0;
                for (let c = 0; c < s; c++) n += t[c], a += e[c];
                if (n < a) return Number.POSITIVE_INFINITY;
                const r = n / a;
                i *= r;
                let o = 0;
                for (let c = 0; c < s; c++) {
                    const s = t[c], n = e[c] * r, a = s > n ? s - n : n - s;
                    if (a > i) return Number.POSITIVE_INFINITY;
                    o += a
                }
                return o / n
            }
        }

        var Et = (() => {
            class t extends It {
                static findStartPattern(e) {
                    const i = e.getSize(), s = e.getNextSet(0);
                    let n = 0;
                    const a = [0, 0, 0, 0, 0, 0];
                    let r = s, o = !1;
                    for (let c = s; c < i; c++) if (e.get(c) !== o) a[n]++; else {
                        if (5 === n) {
                            let i = t.MAX_AVG_VARIANCE, s = -1;
                            for (let e = t.CODE_START_A; e <= t.CODE_START_C; e++) {
                                const n = It.patternMatchVariance(a, t.CODE_PATTERNS[e], t.MAX_INDIVIDUAL_VARIANCE);
                                n < i && (i = n, s = e)
                            }
                            if (s >= 0 && e.isRange(Math.max(0, r - (c - r) / 2), r, !1)) return [r, c, s];
                            r += a[0] + a[1], a.splice(0, 2), a[n - 1] = 0, a[n] = 0, n--
                        } else n++;
                        a[n] = 1, o = !o
                    }
                    throw new mt
                }

                static decodeCode(e, i, s) {
                    It.recordPattern(e, s, i);
                    let n = t.MAX_AVG_VARIANCE, a = -1;
                    for (let r = 0; r < t.CODE_PATTERNS.length; r++) {
                        const e = this.patternMatchVariance(i, t.CODE_PATTERNS[r], t.MAX_INDIVIDUAL_VARIANCE);
                        e < n && (n = e, a = r)
                    }
                    if (a >= 0) return a;
                    throw new mt
                }

                decodeRow(e, i, s) {
                    const n = s && !0 === s.get(7), a = t.findStartPattern(i), r = a[2];
                    let o = 0;
                    const c = new Uint8Array(20);
                    let l;
                    switch (c[o++] = r, r) {
                        case t.CODE_START_A:
                            l = t.CODE_CODE_A;
                            break;
                        case t.CODE_START_B:
                            l = t.CODE_CODE_B;
                            break;
                        case t.CODE_START_C:
                            l = t.CODE_CODE_C;
                            break;
                        default:
                            throw new St
                    }
                    let h = !1, u = !1, d = "", m = a[0], b = a[1];
                    const g = [0, 0, 0, 0, 0, 0];
                    let f = 0, p = 0, S = r, v = 0, w = !0, x = !1, C = !1;
                    for (; !h;) {
                        const e = u;
                        switch (u = !1, f = p, p = t.decodeCode(i, g, b), c[o++] = p, p !== t.CODE_STOP && (w = !0), p !== t.CODE_STOP && (v++, S += v * p), m = b, b += g.reduce((t, e) => t + e, 0), p) {
                            case t.CODE_START_A:
                            case t.CODE_START_B:
                            case t.CODE_START_C:
                                throw new St
                        }
                        switch (l) {
                            case t.CODE_CODE_A:
                                if (p < 64) d += String.fromCharCode(C === x ? " ".charCodeAt(0) + p : " ".charCodeAt(0) + p + 128), C = !1; else if (p < 96) d += String.fromCharCode(C === x ? p - 64 : p + 64), C = !1; else switch (p !== t.CODE_STOP && (w = !1), p) {
                                    case t.CODE_FNC_1:
                                        n && (d += 0 === d.length ? "]C1" : String.fromCharCode(29));
                                        break;
                                    case t.CODE_FNC_2:
                                    case t.CODE_FNC_3:
                                        break;
                                    case t.CODE_FNC_4_A:
                                        !x && C ? (x = !0, C = !1) : x && C ? (x = !1, C = !1) : C = !0;
                                        break;
                                    case t.CODE_SHIFT:
                                        u = !0, l = t.CODE_CODE_B;
                                        break;
                                    case t.CODE_CODE_B:
                                        l = t.CODE_CODE_B;
                                        break;
                                    case t.CODE_CODE_C:
                                        l = t.CODE_CODE_C;
                                        break;
                                    case t.CODE_STOP:
                                        h = !0
                                }
                                break;
                            case t.CODE_CODE_B:
                                if (p < 96) d += String.fromCharCode(C === x ? " ".charCodeAt(0) + p : " ".charCodeAt(0) + p + 128), C = !1; else switch (p !== t.CODE_STOP && (w = !1), p) {
                                    case t.CODE_FNC_1:
                                        n && (d += 0 === d.length ? "]C1" : String.fromCharCode(29));
                                        break;
                                    case t.CODE_FNC_2:
                                    case t.CODE_FNC_3:
                                        break;
                                    case t.CODE_FNC_4_B:
                                        !x && C ? (x = !0, C = !1) : x && C ? (x = !1, C = !1) : C = !0;
                                        break;
                                    case t.CODE_SHIFT:
                                        u = !0, l = t.CODE_CODE_A;
                                        break;
                                    case t.CODE_CODE_A:
                                        l = t.CODE_CODE_A;
                                        break;
                                    case t.CODE_CODE_C:
                                        l = t.CODE_CODE_C;
                                        break;
                                    case t.CODE_STOP:
                                        h = !0
                                }
                                break;
                            case t.CODE_CODE_C:
                                if (p < 100) p < 10 && (d += "0"), d += p; else switch (p !== t.CODE_STOP && (w = !1), p) {
                                    case t.CODE_FNC_1:
                                        n && (d += 0 === d.length ? "]C1" : String.fromCharCode(29));
                                        break;
                                    case t.CODE_CODE_A:
                                        l = t.CODE_CODE_A;
                                        break;
                                    case t.CODE_CODE_B:
                                        l = t.CODE_CODE_B;
                                        break;
                                    case t.CODE_STOP:
                                        h = !0
                                }
                        }
                        e && (l = l === t.CODE_CODE_A ? t.CODE_CODE_B : t.CODE_CODE_A)
                    }
                    if (b = i.getNextUnset(b), !i.isRange(b, Math.min(i.getSize(), b + (b - m) / 2), !1)) throw new mt;
                    if (S -= v * f, S % 103 !== f) throw new pt;
                    const y = d.length;
                    if (0 === y) throw new mt;
                    y > 0 && w && (d = d.substring(0, l === t.CODE_CODE_C ? y - 2 : y - 1));
                    const O = a[0], I = b, E = c.length, M = new Uint8Array(E);
                    for (let t = 0; t < E; t++) M[t] = c[t];
                    const D = [new Ct(O, e), new Ct(I, e)];
                    return new yt(d, M, 0, D, wt.CODE_128, (new Date).getTime())
                }
            }

            return t.CODE_PATTERNS = [[2, 1, 2, 2, 2, 2], [2, 2, 2, 1, 2, 2], [2, 2, 2, 2, 2, 1], [1, 2, 1, 2, 2, 3], [1, 2, 1, 3, 2, 2], [1, 3, 1, 2, 2, 2], [1, 2, 2, 2, 1, 3], [1, 2, 2, 3, 1, 2], [1, 3, 2, 2, 1, 2], [2, 2, 1, 2, 1, 3], [2, 2, 1, 3, 1, 2], [2, 3, 1, 2, 1, 2], [1, 1, 2, 2, 3, 2], [1, 2, 2, 1, 3, 2], [1, 2, 2, 2, 3, 1], [1, 1, 3, 2, 2, 2], [1, 2, 3, 1, 2, 2], [1, 2, 3, 2, 2, 1], [2, 2, 3, 2, 1, 1], [2, 2, 1, 1, 3, 2], [2, 2, 1, 2, 3, 1], [2, 1, 3, 2, 1, 2], [2, 2, 3, 1, 1, 2], [3, 1, 2, 1, 3, 1], [3, 1, 1, 2, 2, 2], [3, 2, 1, 1, 2, 2], [3, 2, 1, 2, 2, 1], [3, 1, 2, 2, 1, 2], [3, 2, 2, 1, 1, 2], [3, 2, 2, 2, 1, 1], [2, 1, 2, 1, 2, 3], [2, 1, 2, 3, 2, 1], [2, 3, 2, 1, 2, 1], [1, 1, 1, 3, 2, 3], [1, 3, 1, 1, 2, 3], [1, 3, 1, 3, 2, 1], [1, 1, 2, 3, 1, 3], [1, 3, 2, 1, 1, 3], [1, 3, 2, 3, 1, 1], [2, 1, 1, 3, 1, 3], [2, 3, 1, 1, 1, 3], [2, 3, 1, 3, 1, 1], [1, 1, 2, 1, 3, 3], [1, 1, 2, 3, 3, 1], [1, 3, 2, 1, 3, 1], [1, 1, 3, 1, 2, 3], [1, 1, 3, 3, 2, 1], [1, 3, 3, 1, 2, 1], [3, 1, 3, 1, 2, 1], [2, 1, 1, 3, 3, 1], [2, 3, 1, 1, 3, 1], [2, 1, 3, 1, 1, 3], [2, 1, 3, 3, 1, 1], [2, 1, 3, 1, 3, 1], [3, 1, 1, 1, 2, 3], [3, 1, 1, 3, 2, 1], [3, 3, 1, 1, 2, 1], [3, 1, 2, 1, 1, 3], [3, 1, 2, 3, 1, 1], [3, 3, 2, 1, 1, 1], [3, 1, 4, 1, 1, 1], [2, 2, 1, 4, 1, 1], [4, 3, 1, 1, 1, 1], [1, 1, 1, 2, 2, 4], [1, 1, 1, 4, 2, 2], [1, 2, 1, 1, 2, 4], [1, 2, 1, 4, 2, 1], [1, 4, 1, 1, 2, 2], [1, 4, 1, 2, 2, 1], [1, 1, 2, 2, 1, 4], [1, 1, 2, 4, 1, 2], [1, 2, 2, 1, 1, 4], [1, 2, 2, 4, 1, 1], [1, 4, 2, 1, 1, 2], [1, 4, 2, 2, 1, 1], [2, 4, 1, 2, 1, 1], [2, 2, 1, 1, 1, 4], [4, 1, 3, 1, 1, 1], [2, 4, 1, 1, 1, 2], [1, 3, 4, 1, 1, 1], [1, 1, 1, 2, 4, 2], [1, 2, 1, 1, 4, 2], [1, 2, 1, 2, 4, 1], [1, 1, 4, 2, 1, 2], [1, 2, 4, 1, 1, 2], [1, 2, 4, 2, 1, 1], [4, 1, 1, 2, 1, 2], [4, 2, 1, 1, 1, 2], [4, 2, 1, 2, 1, 1], [2, 1, 2, 1, 4, 1], [2, 1, 4, 1, 2, 1], [4, 1, 2, 1, 2, 1], [1, 1, 1, 1, 4, 3], [1, 1, 1, 3, 4, 1], [1, 3, 1, 1, 4, 1], [1, 1, 4, 1, 1, 3], [1, 1, 4, 3, 1, 1], [4, 1, 1, 1, 1, 3], [4, 1, 1, 3, 1, 1], [1, 1, 3, 1, 4, 1], [1, 1, 4, 1, 3, 1], [3, 1, 1, 1, 4, 1], [4, 1, 1, 1, 3, 1], [2, 1, 1, 4, 1, 2], [2, 1, 1, 2, 1, 4], [2, 1, 1, 2, 3, 2], [2, 3, 3, 1, 1, 1, 2]], t.MAX_AVG_VARIANCE = .25, t.MAX_INDIVIDUAL_VARIANCE = .7, t.CODE_SHIFT = 98, t.CODE_CODE_C = 99, t.CODE_CODE_B = 100, t.CODE_CODE_A = 101, t.CODE_FNC_1 = 102, t.CODE_FNC_2 = 97, t.CODE_FNC_3 = 96, t.CODE_FNC_4_A = 101, t.CODE_FNC_4_B = 100, t.CODE_START_A = 103, t.CODE_START_B = 104, t.CODE_START_C = 105, t.CODE_STOP = 106, t
        })();
        let Mt = (() => {
            class t {
                constructor(t, e) {
                    this.zone = t, this.rulerService = e, this.position = new h.a, this.subscriptions = [this.rulerService.pointsChanged.subscribe(t => this.setPositionByLine(t, 1, 1))]
                }

                ngOnDestroy() {
                    this.subscriptions.forEach(t => t.unsubscribe())
                }

                async scanWithGreyLevelRetry(t, e) {
                    return this.scan(t, e, 120).catch(i => this.scan(t, e, 90)).catch(i => this.scan(t, e, 85)).catch(i => this.scan(t, e, 75)).catch(i => this.scan(t, e, 70)).catch(i => this.scan(t, e, 65)).catch(i => this.scan(t, e, 60)).catch(i => this.scan(t, e, 55)).catch(i => this.scan(t, e, 50)).catch(i => this.scan(t, e, 45)).catch(i => this.scan(t, e, 40))
                }

                async scan(t, e, i = 70) {
                    return new Promise((s, n) => {
                        console.log("try on grey level", i), (t = t || this.img) ? this.zone.runOutsideAngular(() => {
                            document.body.style.cursor = "wait";
                            const a = new Map;
                            a.set(3, !0), a.set(9, !0), e = e || this.getConfigForImageInstance(), new vt(new Et, 500, a, e, i).decodeFromImage(t).then(t => {
                                document.body.style.cursor = "default";
                                const i = t.getResultPoints(), n = e ? e.x : 0, a = e ? e.y : 0;
                                this.zone.run(() => {
                                    const t = {
                                        x1: i[0].getX() + n,
                                        y1: i[0].getY() + a,
                                        x2: i[1].getX() + n,
                                        y2: i[1].getY() + a
                                    };
                                    s(t), this.position.next(this.getLineForCommonSize(t))
                                })
                            }).catch(t => {
                                document.body.style.cursor = "default", n(t)
                            })
                        }) : n("No image")
                    })
                }

                setImageElement(t) {
                    this.img = t
                }

                setPosition(t) {
                    this.config = t
                }

                getConfigForImageInstance() {
                    if (this.config) {
                        const t = this.img.naturalWidth, e = this.img.naturalHeight;
                        return {
                            x: this.config.x * t,
                            y: this.config.y * e,
                            width: this.config.width * t,
                            height: this.config.height * e
                        }
                    }
                    return null
                }

                getLineForCommonSize(t) {
                    if (this.config) {
                        const e = this.img.naturalWidth, i = this.img.naturalHeight;
                        return {x1: t.x1 / e, y1: t.y1 / i, x2: t.x2 / e, y2: t.y2 / i}
                    }
                    return null
                }

                setPositionByLine([t, e, i, s], n, a) {
                    const [r, o, c, l] = [.05 * a, .05 * a, .05 * n, .05 * n];
                    t > i && ([t, e, i, s] = [i, s, t, e]);
                    let h = t - c;
                    h < 0 && (h = 0);
                    let u = e - r;
                    u < 0 && (u = 0);
                    let d = i + l;
                    d > n && (d = n);
                    let m = s + o;
                    m > a && (m = a), this.setPosition({x: h, y: u, width: d - h, height: m - u})
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(s.v), s.Sb($))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })(), Dt = (() => {
            class t {
                constructor(t, e) {
                    this.videoPlayerService = t, this.throttleFrameRate = 4, this.frameIndex = 0, e.runOutsideAngular(() => {
                        this.imageLoaded = new h.a, this.videoPlayerService.dimensionsChanged.subscribe(t => {
                            this.frameIndex = 0
                        }), this.videoPlayerService.snapshotData.subscribe(t => {
                            this.frameIndex++, this.frameIndex % this.throttleFrameRate != 0 && (this.currentSnapshotData = t, this.imageLoaded.next(this.currentSnapshotData))
                        })
                    })
                }

                getCurrentSnapshotData() {
                    return this.currentSnapshotData
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(Q), s.Sb(s.v))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })(), Pt = (() => {
            class t {
                constructor() {
                    this.isEmbedded = document["app-embedded"] || !1, this.showWarningLinkPoisk = document["warning-link-poisk"] || !1
                }

                setTile(t) {
                    if (!this.isEmbedded) return;
                    const e = document.getElementById("header_title_label");
                    e && (e.innerHTML = t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac, providedIn: "root"}), t
        })();
        var Tt = i("tryS"), Nt = i("Yvf7");
        let _t = (() => {
            class t {
                constructor() {
                    this.subscriptions = []
                }

                ngOnDestroy() {
                    this.subscriptions.forEach(t => {
                        t.unsubscribe()
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275dir = s.Db({type: t}), t
        })();
        var Rt = i("WRsz"), Lt = i("0sao");
        const At = ["canvas"];
        let kt = (() => {
            class t extends _t {
                constructor(t, e, i, s) {
                    super(), this.snapshotDrawer = t, this.videoPlayerService = e, this.cameraSelectorService = i, this.ngZone = s, this.updateCanvasSizeOnDimensionsChange = !0
                }

                ngOnInit() {
                    this.ngZone.runOutsideAngular(() => {
                        this.canvasElementRef.nativeElement instanceof HTMLCanvasElement ? (this.canvas = this.canvasElementRef.nativeElement, this.context = this.canvas.getContext("2d")) : this.img = this.canvasElementRef.nativeElement, this.videoPlayerService.dimensions && this.updateSizes(this.videoPlayerService.dimensions), this.subscriptions.push(this.videoPlayerService.dimensionsChanged.subscribe(t => {
                            this.updateSizes(t)
                        }), this.cameraSelectorService.cameraChanged.subscribe(t => {
                            this.clearCanvas()
                        })), this.snapshotDrawer.imageLoaded.subscribe(t => {
                            this.streamImageDimensions && this.onSnapshotData(t)
                        })
                    })
                }

                updateSizes(t) {
                    !0 === this.updateCanvasSizeOnDimensionsChange && t.width > 0 && t.height > 0 && (this.canvasElementRef.nativeElement.width = t.width, this.canvasElementRef.nativeElement.height = t.height), this.streamImageDimensions = t, this.onDimensionsChanged(t)
                }

                clearCanvas() {
                    this.context && this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
                }

                onDimensionsChanged(t) {
                }

                onSnapshotData(t) {
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(Dt), s.Ib(Q), s.Ib(S), s.Ib(s.v))
            }, t.\u0275cmp = s.Cb({
                type: t, selectors: [["ng-component"]], viewQuery: function (t, e) {
                    var i;
                    1 & t && s.tc(At, !0), 2 & t && s.kc(i = s.Wb()) && (e.canvasElementRef = i.first)
                }, features: [s.tb], decls: 0, vars: 0, template: function (t, e) {
                }, encapsulation: 2, changeDetection: 0
            }), t
        })(), Ft = (() => {
            class t extends kt {
                constructor(t, e, i, n, a) {
                    super(t, e, i, n), this.snapshotDrawer = t, this.videoPlayerService = e, this.cameraSelectorService = i, this.ngZone = n, this.barcodereaderService = a, this.imageFirstLoad = new s.l, this.loaded = !0, this.lost = 0, this.listeners = []
                }

                ngOnInit() {
                    super.ngOnInit(), this.ngZone.runOutsideAngular(() => {
                        this.img || (this.img = new Image), this.listeners = [], this.barcodereaderService && this.barcodereaderService.setImageElement(this.img), this.img.addEventListener(...this.getListenerForEvent("load", this.onImageLoaded)), this.img.addEventListener(...this.getListenerForEvent("error", this.onImageError))
                    })
                }

                getListenerForEvent(t, e) {
                    const i = [t, e.bind(this)];
                    return this.listeners.push(i), i
                }

                onImageError() {
                    URL.revokeObjectURL(this.img.src), this.loaded = !0
                }

                onImageLoaded() {
                    URL.revokeObjectURL(this.img.src), this.loaded || (this.loaded = !0)
                }

                ngOnDestroy() {
                    super.ngOnDestroy(), this.img && (this.listeners.forEach(t => this.img.removeEventListener(...t)), this.img.src = "", this.img = null)
                }

                onSnapshotData(t) {
                    this.loaded ? (this.lost = 0, this.loaded = !1, this.img.src = URL.createObjectURL(new Blob([t.buffer], {type: "image/jpeg"}))) : console.log("Lost frames", ++this.lost)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(Dt), s.Ib(Q), s.Ib(S), s.Ib(s.v), s.Ib(Mt, 8))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-snapshot-drawer"]],
                outputs: {imageFirstLoad: "imageFirstLoad"},
                features: [s.tb],
                decls: 2,
                vars: 0,
                consts: [[1, "snapshot-drawer-canvas"], ["canvas", ""]],
                template: function (t, e) {
                    1 & t && s.Jb(0, "img", 0, 1)
                },
                styles: [".snapshot-drawer-canvas[_ngcontent-%COMP%]{width:100%;height:100%}"],
                changeDetection: 0
            }), t
        })();
        var Vt = i("1xOk"), Bt = i("hqWh"), Zt = i("YLls");

        class zt {
            constructor(t) {
                this.canvas = t, this.context = t.getContext("2d")
            }

            measureText(t) {
                return this.context.measureText(t).width
            }

            getFont(t) {
                return this.canvas.width * (t / this.canvas.width) + "px sans-serif"
            }
        }

        let Ut = (() => {
            class t {
                constructor(t, e) {
                    this.cameraData = t, this.translateService = e, this.backgroundColor = "#000", this.fontColor = "#fff", this.sensorLocationTranslated = "", this.sensorSerialTranslated = "", this.dateTimeTranslated = "", this.fontSizePx = 24, this.sensorSerialTranslated = this.cameraData.deviceTypeName + " " + this.cameraData.serial, this.sensorLocationTranslated = this.cameraData.description, this.dateTimeTranslated = this.translateService.instant("VIDEOPLAYER.DATETIME")
                }
            }

            return t.height = 100, t
        })();

        class Ht extends zt {
            constructor(t, e) {
                super(t), this.canvas = t, this.config = e, this.padding = 15, this.context.font = this.getFont(this.config.fontSizePx), this.padding = Math.floor(.8 * this.measureText("\u0424"))
            }

            drawBottomPlank(t) {
                if (this.context.font = this.getFont(this.config.fontSizePx), this.context.fillStyle = this.config.backgroundColor, this.context.fillRect(0, 0, this.canvas.width, this.canvas.height), this.context.fillStyle = this.config.fontColor, this.context.fillText(this.config.dateTimeTranslated + ": " + this.getDate(t), this.padding, 2 * this.padding), this.context.fillText(this.config.sensorSerialTranslated, this.canvas.width - this.measureText(this.config.sensorSerialTranslated) - this.padding, 2 * this.padding), this.context.font = this.getFont(20), this.measureText(this.config.sensorLocationTranslated) + this.padding > this.canvas.width) {
                    const t = this.config.sensorLocationTranslated.split(" ");
                    let e = 2, i = t.shift(), s = i;
                    for (; t.length;) {
                        for (; this.measureText(s + " " + i) < this.canvas.width && i;) s = s + " " + i, i = t.shift();
                        this.context.fillText(s, this.padding, this.padding * (2 * e)), s = "", e++
                    }
                } else this.context.fillText(this.config.sensorLocationTranslated, this.padding, 4 * this.padding + 10)
            }

            getDate(t) {
                const e = new Date(1e3 * t.header.time + 6e4 * (60 * parseInt(t.header.tzoffset, 10) + (new Date).getTimezoneOffset()));
                let i = "Y-m-d H:i:s";
                return i = i.replace("Y", e.getFullYear().toString()), i = i.replace("m", ("0" + Number(e.getMonth() + 1)).substr(-2).toString()), i = i.replace("d", ("0" + e.getDate()).substr(-2).toString()), i = i.replace("H", ("0" + e.getHours()).substr(-2).toString()), i = i.replace("i", ("0" + e.getMinutes()).substr(-2).toString()), i = i.replace("s", ("0" + e.getSeconds()).substr(-2).toString()), i
            }
        }

        let jt = (() => {
            class t extends kt {
                constructor(t, e, i, s, n) {
                    super(e, i, s, n), this.translateService = t
                }

                onDimensionsChanged(t) {
                    "" === this.videoPlayerService.getCameraData().description && (Ut.height = 50);
                    const e = new Ut(this.videoPlayerService.getCameraData(), this.translateService);
                    this.canvas.width = 944, this.canvas.height = Ut.height, this.drawer = new Ht(this.canvas, e)
                }

                onSnapshotData(t) {
                    this.drawer.drawBottomPlank(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(A.e), s.Ib(Dt), s.Ib(Q), s.Ib(S), s.Ib(s.v))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-bottom-info-plank-drawer"]],
                features: [s.tb],
                decls: 2,
                vars: 0,
                consts: [[1, "bottom-info-plank"], ["canvas", ""]],
                template: function (t, e) {
                    1 & t && s.Jb(0, "canvas", 0, 1)
                },
                styles: [".bottom-info-plank[_ngcontent-%COMP%]{width:100%}"],
                changeDetection: 0
            }), t
        })();

        class Wt {
            constructor(t) {
                this.drawLicenseNumber = !0, this.drawSpeed = !0, this.drawLane = !0, this.fontSizePx = 40, t && (this.drawLicenseNumber = t.drawLicenseNumber, this.drawSpeed = t.drawSpeed, this.drawLane = t.drawLane)
            }
        }

        class Gt extends zt {
            constructor(t, e = new Wt) {
                super(t), this.canvas = t, this.config = e, e && (this.config = new Wt(e)), this.context.font = this.canvas.width * (this.config.fontSizePx / this.canvas.width) + "px sans-serif"
            }

            drawVehiclePlank(t) {
                this.config.drawSpeed && t.speed > 0 && this.addSpeed(t), this.config.drawLane && "" !== t.channel && this.addLane(t), this.config.drawLicenseNumber && "" !== t.licnum && this.addLicenseNumber(t)
            }

            addLicenseNumber(t) {
                const e = this.getRectSize(t.licnum), i = t.x1, s = i - (e.widthWithPadding - (t.x3 - i)) / 2, n = t.y2;
                this.context.fillStyle = "#fff", this.roundRect(this.context, s, n, e.widthWithPadding, e.heightWithPadding, 0), this.context.fillStyle = "#000", this.context.fillText(t.licnum, s + (e.widthWithPadding - e.width) / 2, n + e.heightWithPadding - this.config.fontSizePx / 3)
            }

            addSpeed(t) {
                const e = this.getRectSize(t.speed.toString()), i = this.getRectSize(t.licnum), s = t.x1,
                    n = s - (i.widthWithPadding - (t.x3 - s)) / 2 - e.widthWithPadding, a = t.y2;
                this.context.fillStyle = t.overspeed < 10 ? "#00c800" : t.overspeed < 20 ? "#9cbd03" : t.overspeed < 40 ? "#dcae55" : t.overspeed < 60 ? "#ea7151" : "#d91616", this.roundRect(this.context, n, a, e.widthWithPadding, e.heightWithPadding, {
                    tl: 10,
                    tr: 0,
                    br: 0,
                    bl: 10
                }), this.context.fillStyle = "#fff", this.context.fillText(t.speed.toString(), n + (e.widthWithPadding - e.width) / 2, a + e.heightWithPadding - this.config.fontSizePx / 3)
            }

            addLane(t) {
                const e = this.getRectSize(t.channel), i = this.getRectSize(t.licnum), s = t.x1,
                    n = s - (i.widthWithPadding - (t.x3 - s)) / 2 + e.widthWithPadding, a = t.y2;
                this.context.fillStyle = "#3f51b5", this.roundRect(this.context, n, a, e.widthWithPadding, e.heightWithPadding, {
                    tl: 0,
                    tr: 10,
                    br: 10,
                    bl: 0
                }), this.context.fillStyle = "#fff", this.context.fillText(t.channel, n + (e.widthWithPadding - e.width) / 2, a + e.heightWithPadding - this.config.fontSizePx / 3)
            }

            getRectSize(t, e = 40) {
                let i = Math.round(this.context.measureText(t).width);
                i < e && (i = e);
                const s = this.config.fontSizePx;
                return {
                    width: i,
                    height: s,
                    widthWithPadding: i + this.config.fontSizePx / 2 + Number((i / 100 * 2).toFixed(0)),
                    heightWithPadding: s + this.config.fontSizePx / 3
                }
            }

            roundRect(t, e, i, s, n, a, r, o) {
                if (void 0 === r && (r = !0), void 0 === a && (a = 10), "number" == typeof a) a = {
                    tl: a,
                    tr: a,
                    br: a,
                    bl: a
                }; else {
                    const t = {tl: 0, tr: 0, br: 0, bl: 0};
                    a.tl = a.tl || t.tl, a.tr = a.tr || t.tr, a.br = a.br || t.br, a.bl = a.bl || t.bl
                }
                t.beginPath(), t.moveTo(e + a.tl, i), t.lineTo(e + s - a.tr, i), t.quadraticCurveTo(e + s, i, e + s, i + a.tr), t.lineTo(e + s, i + n - a.br), t.quadraticCurveTo(e + s, i + n, e + s - a.br, i + n), t.lineTo(e + a.bl, i + n), t.quadraticCurveTo(e, i + n, e, i + n - a.bl), t.lineTo(e, i + a.tl), t.quadraticCurveTo(e, i, e + a.tl, i), t.closePath(), r && t.fill(), o && t.stroke()
            }
        }

        let Yt = (() => {
            class t extends kt {
                onSnapshotData(t) {
                    this.clearCanvas(), t.licnumCsvs.forEach(t => {
                        this.drawer.drawVehiclePlank(t)
                    })
                }

                onDimensionsChanged(t) {
                    this.drawer = new Gt(this.canvas)
                }
            }

            return t.\u0275fac = function (e) {
                return qt(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-plate-drawer"]],
                features: [s.tb],
                decls: 2,
                vars: 0,
                consts: [[1, "plate-drawer-canvas"], ["canvas", ""]],
                template: function (t, e) {
                    1 & t && s.Jb(0, "canvas", 0, 1)
                },
                styles: [".plate-drawer-canvas[_ngcontent-%COMP%]{width:100%;height:100%}"]
            }), t
        })();
        const qt = s.Qb(Yt);
        let Xt = (() => {
            class t {
                constructor(t) {
                    const e = t.nativeElement;
                    e.style.position = "absolute", e.style.top = "0px", e.style.height = "auto", e.style.minHeight = "100%", e.style.width = "100%"
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(s.i))
            }, t.\u0275dir = s.Db({type: t, selectors: [["", "videoplayer-overlay", ""]]}), t
        })(), Jt = (() => {
            class t extends kt {
                constructor(t, e, i, s, n) {
                    super(t, e, i, s), this.cropRectangleService = n, this.width = 280, this.height = 150, this.mousePressed = !1
                }

                mouseUpEventHandler() {
                    this.mousePressed = !1, this.ngZone.runOutsideAngular(() => {
                        this.cropRectangleService.cropDragStopped.next()
                    })
                }

                mouseDownEventHandler(t) {
                    const e = this.cropRectangleService.getCropSettings(),
                        i = this.canvas.height / this.canvas.offsetHeight * t.offsetY,
                        s = this.canvas.width / this.canvas.offsetWidth * t.offsetX, n = this.findingCursorInRectangle({
                            x: s,
                            y: i
                        }, this.cropRectangleService.convertCropSettingsToRectangle(e));
                    this.mousePressed = n, n && (this.xInFigure = s - e.x, this.yInFigure = i - e.y, this.ngZone.runOutsideAngular(() => {
                        this.cropRectangleService.cropDragStarted.next()
                    }))
                }

                mouseMoveEventHandler(t) {
                    if (this.mousePressed) {
                        const e = this.cropRectangleService.updateCropSettingsByParams(this.xInFigure, this.yInFigure, this.canvas.width / this.canvas.offsetWidth * t.offsetX, this.canvas.height / this.canvas.offsetHeight * t.offsetY, this.canvas.width, this.canvas.height);
                        this.drawRectangle(e)
                    }
                }

                ngAfterViewInit() {
                    this.cameraSelectorService.cameraChanged.subscribe(t => {
                        this.drawRectangle(this.cropRectangleService.getCropSettings())
                    })
                }

                onDimensionsChanged(t) {
                    const e = this.cropRectangleService.checkCropSettings(this.canvas.width, this.canvas.height, t.width, t.height);
                    this.drawRectangle(e)
                }

                drawRectangle(t) {
                    this.clearCanvas(), this.context.beginPath(), this.context.lineWidth = 5, this.context.strokeStyle = "green", this.context.rect(t.x, t.y, t.w, t.h), this.context.stroke()
                }

                findingCursorInRectangle(t, e) {
                    return t.x > e[0].x && t.x < e[1].x && t.x > e[2].x && t.x < e[3].x && t.y > e[0].y && t.y > e[1].y && t.y < e[2].y && t.y < e[3].y
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(Dt), s.Ib(Q), s.Ib(S), s.Ib(s.v), s.Ib(J))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-rectangle-drawer"]],
                hostBindings: function (t, e) {
                    1 & t && s.Vb("mouseup", (function (t) {
                        return e.mouseUpEventHandler(t)
                    }), !1, s.nc)
                },
                features: [s.tb],
                decls: 2,
                vars: 0,
                consts: [[1, "rectangle-drawer-canvas", 3, "mousedown", "mousemove", "pointermove", "pointerdown"], ["canvas", ""]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "canvas", 0, 1), s.Vb("mousedown", (function (t) {
                        return e.mouseDownEventHandler(t)
                    }))("mousemove", (function (t) {
                        return e.mouseMoveEventHandler(t)
                    }))("pointermove", (function (t) {
                        return e.mouseMoveEventHandler(t)
                    }))("pointerdown", (function (t) {
                        return e.mouseDownEventHandler(t)
                    })), s.Nb())
                },
                styles: [".rectangle-drawer-canvas{width:100%;height:100%;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;touch-action:none}"],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();
        const Qt = ["videoPlayerContainer"];

        function $t(t, e) {
            1 & t && (s.Ob(0, "div", 29, 30), s.Jb(2, "img", 31), s.Ob(3, "div", 32), s.xc(4), s.ac(5, "translate"), s.Nb(), s.Nb()), 2 & t && (s.wb(4), s.zc(" ", s.bc(5, 1, "VIDEOPLAYER.NO_SIGNAL"), " "))
        }

        function Kt(t, e) {
            1 & t && s.Jb(0, "app-bottom-info-plank-drawer", 7, 33)
        }

        function te(t, e) {
            1 & t && s.Jb(0, "app-plate-drawer", 34)
        }

        function ee(t, e) {
            1 & t && s.Jb(0, "app-rectangle-drawer", 34)
        }

        function ie(t, e) {
            1 & t && s.cc(0, 4, ["*ngIf", "inFullScreen"])
        }

        function se(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "button", 16), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().videoPlayerService.playAndStop(5)
                })), s.ac(1, "translate"), s.Ob(2, "mat-icon"), s.xc(3, "fiber_smart_record"), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.ec("disabled", !t.videoPlayerService.connected || !0)("title", s.bc(1, 2, "VIDEOPLAYER.RECORD_RC"))
            }
        }

        function ne(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "button", 35), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().toggleStretchMode()
                })), s.ac(1, "translate"), s.Ob(2, "mat-icon"), s.xc(3), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.ec("title", s.bc(1, 2, t.stretchMode ? "VIDEOPLAYER.DISABLE_STRETCH" : "VIDEOPLAYER.ENABLE_STRETCH")), s.wb(3), s.zc("", t.stretchMode ? "photo_size_select_actual" : "photo_size_select_large", " ")
            }
        }

        function ae(t, e) {
            if (1 & t && (s.Ob(0, "button", 36), s.ac(1, "translate"), s.Ob(2, "mat-icon", 37), s.xc(3, "traffic"), s.Nb(), s.Nb()), 2 & t) {
                const t = s.Zb();
                s.ec("title", s.bc(1, 2, "VIDEOPLAYER.TRAFFIC_LIGHT")), s.wb(2), s.ec("color", t.redLampDetected ? "warn" : t.redLampDisabledColor)
            }
        }

        function re(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "button", 16), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().toggleZoom()
                })), s.ac(1, "translate"), s.Ob(2, "mat-icon"), s.xc(3), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.ec("disabled", !t.videoPlayerService.connected)("title", s.bc(1, 3, t.showZoomComponents ? "VIDEOPLAYER.DISABLE_ZOOM" : "VIDEOPLAYER.ENABLE_ZOOM")), s.wb(3), s.yc(t.showZoomComponents ? "zoom_out" : "zoom_in")
            }
        }

        function oe(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "button", 16), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().toggleFullscreen()
                })), s.ac(1, "translate"), s.Ob(2, "mat-icon"), s.xc(3, "fullscreen"), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.ec("disabled", !t.videoPlayerService.connected)("title", s.bc(1, 2, "VIDEOPLAYER.FULLSCREEN"))
            }
        }

        function ce(t, e) {
            if (1 & t && (s.Ob(0, "button", 38), s.ac(1, "translate"), s.Ob(2, "mat-icon"), s.xc(3, "tune"), s.Nb(), s.Nb()), 2 & t) {
                s.Zb();
                const t = s.lc(37);
                s.ec("matMenuTriggerFor", t)("title", s.bc(1, 2, "VIDEOPLAYER.SETTINGS.TITLE"))
            }
        }

        function le(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "button", 39), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().videoPlayerService.toggleRecognitionMode()
                })), s.xc(1), s.ac(2, "translate"), s.ac(3, "translate"), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.ec("ngClass", !0 === t.videoPlayerService.recognitionMode ? "selected" : "untoggled"), s.wb(1), s.Ac(" ", s.bc(2, 3, "VIDEOPLAYER.SETTINGS.RECOG_MODE.TITLE"), " [ ", s.bc(3, 5, t.videoPlayerService.recognitionMode ? "VIDEOPLAYER.SETTINGS.RECOG_MODE.ENABLED" : "VIDEOPLAYER.SETTINGS.RECOG_MODE.DISABLED"), " ] ")
            }
        }

        function he(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "button", 39), s.Vb("click", (function () {
                    s.oc(t);
                    const i = e.$implicit;
                    return s.Zb().videoPlayerService.selectedSnapshotWidth = i
                })), s.xc(1), s.Nb()
            }
            if (2 & t) {
                const t = e.$implicit, i = s.Zb();
                s.ec("ngClass", i.videoPlayerService.selectedSnapshotWidth === t ? "selected" : ""), s.wb(1), s.zc(" ", t, " ")
            }
        }

        function ue(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "button", 39), s.Vb("click", (function () {
                    s.oc(t);
                    const i = e.$implicit;
                    return s.Zb().videoPlayerService.selectedSnapshotQuality = i
                })), s.xc(1), s.Nb()
            }
            if (2 & t) {
                const t = e.$implicit, i = s.Zb();
                s.ec("ngClass", i.videoPlayerService.selectedSnapshotQuality === t ? "selected" : ""), s.wb(1), s.zc(" ", t, " ")
            }
        }

        const de = [[["", "videoplayer-camera-selector", ""]], [["", "videoplayer-overlay", ""]], [["", "red-lamp-verifier", ""]], [["", "additionalControls", ""]], [["", "fullscreen", ""]]],
            me = ["[videoplayer-camera-selector]", "[videoplayer-overlay]", "[red-lamp-verifier]", "[additionalControls]", "[fullscreen]"];
        let be = (() => {
            class t extends _t {
                constructor(t, e, i, n) {
                    super(), this.videoPlayerService = t, this.dialog = e, this.cropRectangleService = i, this.cdr = n, this.showBottomInfoPlank = !1, this.showRcRecordButton = !1, this.showSnapshotSettings = !1, this.showFullscreen = !1, this.showRecognitionButton = !1, this.forceRecognitionMode = null, this.settingsPrefix = "default", this.forceAutoplay = !1, this.redLampDisabledColor = "green", this.showStretchButton = !1, this.stretchScaleFactor = 2, this.stretchMode = !1, this.disconnectOnDestroy = !0, this.showZoomButton = !1, this.useRectangleService = !1, this.draggablePlayerHiddenChanged = new s.l, this.showCarPlanks = !1, this.redLampDetected = !1, this.inFullScreen = !1, this.showZoomComponents = !1, this.dimensions = {
                        width: 2336,
                        height: 880
                    }, this.hasRealDimensions = !1
                }

                set maxContainerHeight(t) {
                    this.maxHeight !== t && t && t > 100 && (this.maxHeight = t - 56, this.updateContainerSize())
                }

                get maxContainerHeight() {
                    return this.maxHeight
                }

                ngOnInit() {
                    this.subscriptions.push(this.createRedlampSnapshotSubscription(), this.createDimensionsSubscription()), this.videoPlayerService.initDefaultSettings(this.settingsPrefix, this.forceRecognitionMode, this.forceAutoplay, !1 === this.showZoomButton && !0 === this.useRectangleService), this.videoPlayerService.streamState.subscribe(t => this.cdr.detectChanges())
                }

                ngAfterViewInit() {
                    this.clientWidth = this.videoPlayerContainer.nativeElement.clientWidth, this.updateContainerSize()
                }

                ngOnDestroy() {
                    super.ngOnDestroy(), this.videoPlayerService.stop(), this.disconnectOnDestroy && this.videoPlayerService.disconnect()
                }

                getNativeElementClientWidth() {
                    return this.inFullScreen ? this.videoPlayerContainer.nativeElement.clientWidth : this.clientWidth
                }

                updateContainerSize() {
                    const t = this.getContainerHeight();
                    this.containerHeight = t.height, this.videoWidth = this.getVideoWidth(t.needRecalcWidth, t.height), this.videoHeight = this.getVideoHeight(t.height)
                }

                toggleZoom() {
                    this.showZoomComponents = !this.showZoomComponents, this.draggablePlayerHiddenChanged.emit(this.showZoomComponents)
                }

                toggleFullscreen() {
                    let t = this.fullScreenElement ? this.fullScreenElement : this.videoPlayerContainer;
                    const e = document;
                    t instanceof s.i && (t = t.nativeElement), this.inFullScreen ? e.exitFullscreen ? e.exitFullscreen() : e.webkitCancelFullScreen ? e.webkitCancelFullScreen() : e.webkitExitFullscreen ? e.webkitExitFullscreen() : e.mozCancelFullScreen ? e.mozCancelFullScreen() : e.mozExitFullScreen ? e.mozExitFullScreen() : e.msExitFullscreen && e.msExitFullscreen() : t.requestFullscreen ? t.requestFullscreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : e.msRequestFullscreen && t.msRequestFullscreen()
                }

                fullScreenChangeEvent(t) {
                    const e = document;
                    this.inFullScreen = e.fullScreen || e.mozFullScreen || e.webkitIsFullScreen, this.updateContainerSize()
                }

                click() {
                    const t = document;
                    (t.fullScreen || t.mozFullScreen || t.webkitIsFullScreen) && this.toggleFullscreen()
                }

                toggleStretchMode() {
                    this.stretchMode = !0 !== this.stretchMode, this.updateContainerSize()
                }

                playAndStop(t) {
                    !0 === this.videoPlayerService.isStopped && this.videoPlayerService.playAndStop(t)
                }

                getVideoWidth(t, e) {
                    return this.hasRealDimensions ? this.stretchMode ? this.dimensions.width : t ? this.dimensions.width * e / this.dimensions.height : this.getNativeElementClientWidth() : null
                }

                getVideoHeight(t) {
                    return this.hasRealDimensions ? this.stretchMode ? this.dimensions.height : t : null
                }

                getContainerHeight() {
                    const t = this.dimensions.height * this.getNativeElementClientWidth() / this.dimensions.width;
                    return !this.inFullScreen && void 0 !== this.maxContainerHeight && t > this.maxContainerHeight ? {
                        height: this.maxContainerHeight,
                        needRecalcWidth: !0
                    } : {height: t, needRecalcWidth: !1}
                }

                createRedlampSnapshotSubscription() {
                    return this.videoPlayerService.snapshotData.pipe(Object(W.a)(t => t.header.ret_params && "0,0,0x0" !== t.header.ret_params.REDLIGHT_POS), Object(g.a)(t => parseInt(t.header.ret_params.RED_LAMP, 10)), Object(g.a)(t => 1 === t)).subscribe(t => this.redLampDetected = t)
                }

                createDimensionsSubscription() {
                    return this.videoPlayerService.dimensionsChanged.subscribe(t => {
                        this.dimensions = t, this.hasRealDimensions = !0, this.updateContainerSize()
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(Q), s.Ib(Lt.b), s.Ib(J), s.Ib(s.f))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-video-player"]],
                viewQuery: function (t, e) {
                    var i;
                    1 & t && s.tc(Qt, !0), 2 & t && s.kc(i = s.Wb()) && (e.videoPlayerContainer = i.first)
                },
                hostBindings: function (t, e) {
                    1 & t && s.Vb("fullscreenchange", (function (t) {
                        return e.fullScreenChangeEvent(t)
                    }), !1, s.nc)("click", (function () {
                        return e.click()
                    }), !1, s.nc)
                },
                inputs: {
                    showBottomInfoPlank: "showBottomInfoPlank",
                    showRcRecordButton: "showRcRecordButton",
                    showSnapshotSettings: "showSnapshotSettings",
                    showFullscreen: "showFullscreen",
                    showRecognitionButton: "showRecognitionButton",
                    forceRecognitionMode: "forceRecognitionMode",
                    settingsPrefix: "settingsPrefix",
                    forceAutoplay: "forceAutoplay",
                    redLampDisabledColor: "redLampDisabledColor",
                    showStretchButton: "showStretchButton",
                    stretchScaleFactor: "stretchScaleFactor",
                    stretchMode: "stretchMode",
                    disconnectOnDestroy: "disconnectOnDestroy",
                    fullScreenElement: "fullScreenElement",
                    showZoomButton: "showZoomButton",
                    useRectangleService: "useRectangleService",
                    showCarPlanks: "showCarPlanks",
                    maxContainerHeight: "maxContainerHeight",
                    showZoomComponents: "showZoomComponents"
                },
                outputs: {draggablePlayerHiddenChanged: "draggablePlayerHiddenChanged"},
                features: [s.tb],
                ngContentSelectors: me,
                decls: 51,
                vars: 42,
                consts: [[1, "mat-elevation-z1", 2, "max-width", "100%"], [1, "fullscreen-container"], ["videoPlayerContainer", ""], ["class", "overlay", 4, "ngIf"], [1, "relative-video"], [1, "video-container", "relative-video", 3, "ngClass"], ["container", ""], [1, "flex"], ["appSnapshotDrawer", ""], ["class", "flex", 4, "ngIf"], ["videoplayer-overlay", "", 4, "ngIf"], [4, "ngIf"], [1, "video-player-controls"], [1, "float-left"], [1, "btn-group"], ["mat-icon-button", "", "color", "accent", 3, "disabled", "title", "click"], ["mat-icon-button", "", "color", "primary", 3, "disabled", "title", "click"], ["mat-icon-button", "", "color", "primary", 3, "disabled", "title", "click", 4, "ngIf"], [1, "float-right"], ["mat-icon-button", "", "color", "primary", 3, "title", "click", 4, "ngIf"], ["mat-icon-button", "", "disabled", "", "color", "primary", 3, "title", 4, "ngIf"], ["mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor", "title", 4, "ngIf"], ["xPosition", "before"], ["settingsMenu", "matMenu"], ["mat-menu-item", "", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "ngClass", "click", 4, "ngIf"], ["imageWidth", "matMenu"], ["mat-menu-item", "", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["imageQuality", "matMenu"], [1, "overlay"], ["overlayContainer", ""], ["src", "images/rolling.png"], [1, "video-player-error"], ["appBottomInfoPlankDrawer", ""], ["videoplayer-overlay", ""], ["mat-icon-button", "", "color", "primary", 3, "title", "click"], ["mat-icon-button", "", "disabled", "", "color", "primary", 3, "title"], [3, "color"], ["mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor", "title"], ["mat-menu-item", "", 3, "ngClass", "click"]],
                template: function (t, e) {
                    if (1 & t && (s.dc(de), s.Ob(0, "div", 0), s.Ob(1, "div", 1, 2), s.cc(3), s.vc(4, $t, 6, 3, "div", 3), s.Ob(5, "div", 4), s.Ob(6, "div", 5, 6), s.Jb(8, "app-snapshot-drawer", 7, 8), s.vc(10, Kt, 2, 0, "app-bottom-info-plank-drawer", 9), s.vc(11, te, 1, 0, "app-plate-drawer", 10), s.vc(12, ee, 1, 0, "app-rectangle-drawer", 10), s.cc(13, 1), s.cc(14, 2), s.Nb(), s.Nb(), s.vc(15, ie, 1, 0, void 0, 11), s.Nb(), s.Ob(16, "div", 12), s.Ob(17, "div", 13), s.Ob(18, "div", 14), s.Ob(19, "button", 15), s.Vb("click", (function () {
                        return e.videoPlayerService.togglePlay()
                    })), s.ac(20, "translate"), s.Ob(21, "mat-icon"), s.xc(22), s.Nb(), s.Nb(), s.Ob(23, "button", 16), s.Vb("click", (function () {
                        return e.videoPlayerService.playFrame()
                    })), s.ac(24, "translate"), s.Ob(25, "mat-icon"), s.xc(26, "skip_next"), s.Nb(), s.Nb(), s.vc(27, se, 4, 4, "button", 17), s.Nb(), s.Nb(), s.Ob(28, "div", 18), s.Ob(29, "div", 14), s.cc(30, 3), s.vc(31, ne, 4, 4, "button", 19), s.vc(32, ae, 4, 4, "button", 20), s.vc(33, re, 4, 5, "button", 17), s.vc(34, oe, 4, 4, "button", 17), s.vc(35, ce, 4, 4, "button", 21), s.Nb(), s.Nb(), s.Nb(), s.Ob(36, "mat-menu", 22, 23), s.Ob(38, "button", 24), s.xc(39), s.ac(40, "translate"), s.Nb(), s.Ob(41, "button", 24), s.xc(42), s.ac(43, "translate"), s.Nb(), s.vc(44, le, 4, 7, "button", 25), s.Nb(), s.Ob(45, "mat-menu", 22, 26), s.vc(47, he, 2, 2, "button", 27), s.Nb(), s.Ob(48, "mat-menu", 22, 28), s.vc(50, ue, 2, 2, "button", 27), s.Nb(), s.Nb()), 2 & t) {
                        const t = s.lc(46), i = s.lc(49);
                        s.wb(4), s.ec("ngIf", !e.videoPlayerService.connected), s.wb(1), s.uc("height", e.stretchMode ? e.containerHeight + "px" : "auto")("overflow", e.showStretchButton && e.stretchMode ? "scroll" : "hidden"), s.wb(1), s.uc("width", e.stretchMode ? e.videoWidth + "px" : "auto")("height", e.stretchMode ? e.videoHeight + "px" : "auto"), s.ec("ngClass", e.stretchMode ? "stretched" : ""), s.wb(4), s.ec("ngIf", !0 === e.showBottomInfoPlank), s.wb(1), s.ec("ngIf", !0 === e.showCarPlanks), s.wb(1), s.ec("ngIf", !1 === e.useRectangleService && e.showZoomComponents), s.wb(3), s.ec("ngIf", e.inFullScreen), s.wb(4), s.ec("disabled", !e.videoPlayerService.connected)("title", s.bc(20, 34, e.videoPlayerService.isStopped ? "VIDEOPLAYER.PLAY" : "VIDEOPLAYER.STOP")), s.wb(3), s.yc(e.videoPlayerService.isStopped ? "play_arrow" : "stop"), s.wb(1), s.ec("disabled", !1 === e.videoPlayerService.isStopped || !e.videoPlayerService.connected)("title", s.bc(24, 36, "VIDEOPLAYER.SKIP")), s.wb(4), s.ec("ngIf", !0 === e.showRcRecordButton), s.wb(4), s.ec("ngIf", e.showStretchButton), s.wb(1), s.ec("ngIf", !1 === e.videoPlayerService.recognitionMode && e.videoPlayerService.getCameraData() && "VIEW" === e.videoPlayerService.getCameraData().type), s.wb(1), s.ec("ngIf", !0 === e.showZoomButton), s.wb(1), s.ec("ngIf", !0 === e.showFullscreen), s.wb(1), s.ec("ngIf", !0 === e.showSnapshotSettings), s.wb(3), s.ec("matMenuTriggerFor", t), s.wb(1), s.Ac("", s.bc(40, 38, "VIDEOPLAYER.SETTINGS.WIDTH"), " [", e.videoPlayerService.selectedSnapshotWidth, "] "), s.wb(2), s.ec("matMenuTriggerFor", i), s.wb(1), s.Ac("", s.bc(43, 40, "VIDEOPLAYER.SETTINGS.QUALITY"), " [", e.videoPlayerService.selectedSnapshotQuality, "] "), s.wb(2), s.ec("ngIf", e.showRecognitionButton && e.videoPlayerService.hasDelayedLiveVideo() && e.videoPlayerService.hasViolationService()), s.wb(3), s.ec("ngForOf", e.videoPlayerService.snapshotWidthList), s.wb(3), s.ec("ngForOf", e.videoPlayerService.snapshotQualityList)
                    }
                },
                directives: [Nt.g, Nt.e, Ft, Vt.a, Bt.a, Zt.d, Zt.a, Zt.c, Nt.f, jt, Yt, Xt, Jt],
                pipes: [A.d],
                styles: ["[_nghost-%COMP%]{width:100%}.fullscreen-container[_ngcontent-%COMP%]{min-height:160px;position:relative}.fullscreen-container[_ngcontent-%COMP%]:-webkit-full-screen{background-color:#000}.fullscreen-container[_ngcontent-%COMP%]:fullscreen{background-color:#000}button.mat-menu-item.selected[_ngcontent-%COMP%]{background-color:#b8cfed}.video-player-controls[_ngcontent-%COMP%]{display:flex;flex:1;justify-content:space-between;border-top:3px solid #3f51b5;background-color:#fff}.video-player-controls[_ngcontent-%COMP%]   button.pressed[_ngcontent-%COMP%]{background-color:#b2b6d0}.fullscreen-container[_ngcontent-%COMP%]:-webkit-full-screen   app-bottom-info-plank-drawer[_ngcontent-%COMP%]{position:absolute;bottom:0;width:100%}.fullscreen-container[_ngcontent-%COMP%]:fullscreen   app-bottom-info-plank-drawer[_ngcontent-%COMP%]{position:absolute;bottom:0;width:100%}.mat-untoggled[_ngcontent-%COMP%]{color:#ff8a65}.mat-icon.mat-green[_ngcontent-%COMP%]{color:#4caf50}.relative-video.stretched[_ngcontent-%COMP%]{width:100%;height:100%;position:relative}.video-player-error[_ngcontent-%COMP%]{position:absolute;top:75%;left:50%;transform:translateX(-50%);font-size:30px;background-color:#ff4081;color:#fff;padding:5px;border-radius:5px;white-space:nowrap}.relative-video.stretched[_ngcontent-%COMP%] > [videoplayer-overlay-resizeable][_ngcontent-%COMP%], .video-container.stretched[_ngcontent-%COMP%] > [videoplayer-overlay][_ngcontent-%COMP%]{position:absolute;top:0;left:0;display:flex;width:100%}.relative-video.stretched[_ngcontent-%COMP%] > [videoplayer-overlay-resizeable][_ngcontent-%COMP%], .video-container.stretched[_ngcontent-%COMP%]{width:100%;height:100%}", ".flex[_ngcontent-%COMP%]{display:flex}.flex-wide[_ngcontent-%COMP%], .flex.wide[_ngcontent-%COMP%]{display:flex;flex:1}.flex-wide[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%], .flex.wide[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1}.flex-wide.align-center[_ngcontent-%COMP%], .flex.align-center[_ngcontent-%COMP%]{justify-content:center;align-items:center}.flex-column[_ngcontent-%COMP%]{flex-direction:column}.flex-row-gap[_ngcontent-%COMP%]{margin-top:-8px}.flex-row-gap[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{margin-top:8px!important}.space-between[_ngcontent-%COMP%]{justify-content:space-between}.flex-wide.align-right[_ngcontent-%COMP%], .flex.align-right[_ngcontent-%COMP%]{justify-content:flex-end}.btn-group[_ngcontent-%COMP%]{height:100%}.btn-group[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border-radius:0}.mat-icon-button.mat-stroked-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{line-height:20px}.full-width-button[_ngcontent-%COMP%]{flex:1;justify-content:center}.blue-separator[_ngcontent-%COMP%]{background-color:#3f51b5;height:4px}.float-left[_ngcontent-%COMP%]{float:left}.float-right[_ngcontent-%COMP%]{float:right}.overlay[_ngcontent-%COMP%]{position:absolute;background-color:hsla(0,0%,100%,.5);width:100%;height:100%;display:flex;flex:1;justify-content:center;align-items:center;z-index:99}.alert[_ngcontent-%COMP%]{border-style:dashed;border-width:1px;border-radius:5px;padding:10px;margin:10px 0}.alert.danger[_ngcontent-%COMP%]{background-color:#ffefee;border-color:#f44336;color:#f10}.alert.primary[_ngcontent-%COMP%]{border-color:#3f51b5;color:#3f51b5}.blink[_ngcontent-%COMP%]{-webkit-animation:blink-animation 1s steps(5,start) infinite;animation:blink-animation 1s steps(5,start) infinite}@-webkit-keyframes blink-animation{to{background-color:#f9edbe}}@keyframes blink-animation{to{background-color:#f9edbe}}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.flex.box-video[_ngcontent-%COMP%]{flex-direction:row;justify-content:space-between;position:relative;align-self:stretch}.flex-2[_ngcontent-%COMP%]{flex:2 1}.flex-1[_ngcontent-%COMP%]{flex:1 1}"],
                data: {animation: [Object(Rt.n)("blinkRecButton", [Object(Rt.k)("static", Object(Rt.l)({opacity: 1})), Object(Rt.k)("in", Object(Rt.l)({opacity: 1})), Object(Rt.k)("out", Object(Rt.l)({opacity: 0})), Object(Rt.m)("* => static", Object(Rt.e)("0s linear")), Object(Rt.m)("* => in", Object(Rt.e)("1s linear")), Object(Rt.m)("* => out", Object(Rt.e)("1s linear"))])]}
            }), t
        })();
        var ge = i("ZJy8");
        let fe = (() => {
            class t {
                constructor(t, e, i, n, a) {
                    this.motorDataService = t, this.motorDbService = e, this.calibrateService = i, this.cameraSelectorService = n, this.translateService = a, this.changeEmitter = new s.l
                }

                onChange(t) {
                    this.changeEmitter.emit(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(k), s.Ib(v), s.Ib(K), s.Ib(S), s.Ib(A.e))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["base-motor-group"]],
                inputs: {cameraInfo: "cameraInfo"},
                outputs: {changeEmitter: "changeEmitter"},
                decls: 0,
                vars: 0,
                template: function (t, e) {
                },
                encapsulation: 2
            }), t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })();
        var pe = i("lay6"), Se = i("wXtk"), ve = i("9TM2"), we = i("CsWY"), xe = i("N2ZZ"), Ce = i("8VHZ"),
            ye = i("cBoe");
        const Oe = ["slider"];

        function Ie(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 4), s.Ob(1, "mat-form-field"), s.Ob(2, "input", 5), s.Vb("ngModelChange", (function (e) {
                    return s.oc(t), s.Zb().sliderStep = e
                })), s.ac(3, "translate"), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(1), s.uc("max-width", t.fieldWidth)("width", t.fieldWidth), s.wb(1), s.fc("placeholder", s.bc(3, 9, "STEP")), s.ec("min", t.minStep)("max", t.maxStep)("disabled", t.disabled)("ngModel", t.sliderStep)
            }
        }

        function Ee(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 6), s.Ob(1, "mat-slider", 7, 8), s.Vb("ngModelChange", (function (e) {
                    return s.oc(t), s.Zb().value = e
                }))("change", (function (e) {
                    return s.oc(t), s.Zb().onSliderChange(e)
                }))("input", (function (e) {
                    s.oc(t);
                    const i = s.Zb();
                    return i.stepHovered = e.value / i.sliderStep
                })), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(1), s.ec("ngClass", t.getSliderClass)("disabled", t.disabled)("min", t.sliderMinValue)("max", t.sliderMaxValue)("step", t.sliderStep)("tickInterval", 1)("ngModel", t.value)
            }
        }

        function Me(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 4), s.Ob(1, "button", 9), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().setMinValue()
                })), s.ac(2, "translate"), s.xc(3), s.Nb(), s.Ob(4, "button", 9), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().setMaxValue()
                })), s.ac(5, "translate"), s.xc(6), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(1), s.fc("title", s.bc(2, 6, "SET_MIN")), s.ec("disabled", t.disabled), s.wb(2), s.yc(t.min), s.wb(1), s.fc("title", s.bc(5, 8, "SET_MAX")), s.ec("disabled", t.disabled), s.wb(2), s.yc(t.max)
            }
        }

        function De(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 10), s.Ob(1, "mat-form-field", 6), s.Ob(2, "input", 11), s.Vb("ngModelChange", (function (e) {
                    return s.oc(t), s.Zb().value = e
                }))("change", (function (e) {
                    return s.oc(t), s.Zb().onValueChange(e)
                })), s.ac(3, "translate"), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(2), s.fc("placeholder", s.bc(3, 6, "VALUE")), s.ec("min", t.min)("max", t.max)("step", t.sliderStep)("disabled", t.disabled)("ngModel", t.value)
            }
        }

        let Pe = (() => {
            class t {
                constructor() {
                    this.min = -Number.MAX_SAFE_INTEGER, this.max = Number.MAX_SAFE_INTEGER, this.minStep = .001, this.maxStep = 1e3, this.showMinMax = !1, this.showTwist = !0, this.showTwistNoChangeValue = !1, this.showValueNoChange = !1, this.value = 0, this.step = 100, this.showValue = !0, this.showStep = !1, this.disabled = !1, this.fieldWidth = "100%", this.sliderStep = 10, this.valueChange = new s.l, this.twist = new s.l, this.stepChange = new s.l
                }

                ngOnInit() {
                    this.sliderStep = this.step
                }

                get sliderMinValue() {
                    const t = !1 === this.withFeedback ? 0 - 5 * this.sliderStep : this.value - 5 * this.sliderStep;
                    return !1 === this.withFeedback ? t : this.checkValueBounds(t, this.min, this.max, this.sliderStep, this.value)
                }

                get sliderMaxValue() {
                    const t = !1 === this.withFeedback ? 0 + 5 * this.sliderStep : this.value + 5 * this.sliderStep;
                    return !1 === this.withFeedback ? t : this.checkValueBounds(t, this.min, this.max, this.sliderStep, this.value)
                }

                setMinValue() {
                    this.value = this.min, this.valueChange.emit(this.value)
                }

                setMaxValue() {
                    this.value = this.max, this.valueChange.emit(this.value)
                }

                checkValueBounds(t, e, i, s, n) {
                    return t < e ? e = n < e ? s : n - s * Math.floor(n / s) : t > i ? i = n > i ? s : n + Math.floor((i - n) / s) * s : t
                }

                onValueChange(t) {
                    const e = Number(t.target.value);
                    console.log("onValueChange:", this.value, t, e), this.value < this.min && (this.step = this.min), this.value > this.max && (this.step = this.max), !1 === this.withFeedback ? (this.valueChange.emit(e), this.value = 0, this.slider.value = 0) : (this.value = this.checkValueBounds(e, this.min, this.max, this.step, this.value), this.valueChange.emit(this.value))
                }

                onSliderChange(t) {
                    console.log("onSliderChange:", this.value, t), !1 === this.withFeedback ? (this.valueChange.emit(t.value), this.value = 0, this.slider.value = 0, this.stepHovered = 0) : (this.value = this.checkValueBounds(t.value, this.min, this.max, this.step, this.value), this.valueChange.emit(this.value))
                }

                get getSliderClass() {
                    let t = "";
                    return !1 === this.withFeedback && (t += "slider-without-feedback", t += this.getFillClass()), t
                }

                getFillClass() {
                    return this.stepHovered ? this.stepHovered < 0 ? " revert percent" + 10 * Math.abs(this.stepHovered) : " percent" + 10 * Math.abs(this.stepHovered) : ""
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-increment"]],
                viewQuery: function (t, e) {
                    var i;
                    1 & t && s.Cc(Oe, !0), 2 & t && s.kc(i = s.Wb()) && (e.slider = i.first)
                },
                inputs: {
                    min: "min",
                    max: "max",
                    minStep: "minStep",
                    maxStep: "maxStep",
                    showMinMax: "showMinMax",
                    showTwist: "showTwist",
                    showTwistNoChangeValue: "showTwistNoChangeValue",
                    showValueNoChange: "showValueNoChange",
                    value: "value",
                    step: "step",
                    showValue: "showValue",
                    showStep: "showStep",
                    disabled: "disabled",
                    fieldWidth: "fieldWidth",
                    sliderStep: "sliderStep",
                    withFeedback: "withFeedback"
                },
                outputs: {valueChange: "valueChange", twist: "twist", stepChange: "stepChange"},
                decls: 5,
                vars: 4,
                consts: [[1, "flex", "flex-wide", "float-right", "flex-wrap"], ["class", "flex", "style", "padding: 8px;", 4, "ngIf"], ["class", "flex flex-wide", 4, "ngIf"], ["class", "flex flex-wide", "style", "padding: 8px;", 4, "ngIf"], [1, "flex", 2, "padding", "8px"], ["matInput", "", "type", "number", 3, "placeholder", "min", "max", "disabled", "ngModel", "ngModelChange"], [1, "flex", "flex-wide"], ["thumbLabel", "", "color", "accent", 1, "flex", "flex-wide", 3, "ngClass", "disabled", "min", "max", "step", "tickInterval", "ngModel", "ngModelChange", "change", "input"], ["slider", ""], ["mat-stroked-button", "", "color", "warn", 3, "disabled", "title", "click"], [1, "flex", "flex-wide", 2, "padding", "8px"], ["matInput", "", "type", "number", 3, "placeholder", "min", "max", "step", "disabled", "ngModel", "ngModelChange", "change"]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "div", 0), s.vc(1, Ie, 4, 11, "div", 1), s.vc(2, Ee, 3, 7, "div", 2), s.vc(3, Me, 7, 10, "div", 1), s.vc(4, De, 4, 8, "div", 3), s.Nb()), 2 & t && (s.wb(1), s.ec("ngIf", e.showStep), s.wb(1), s.ec("ngIf", e.showTwist), s.wb(1), s.ec("ngIf", e.showMinMax), s.wb(1), s.ec("ngIf", e.showValue))
                },
                directives: [Nt.g, we.b, xe.b, Ce.l, Ce.b, Ce.h, Ce.j, ye.a, Nt.e, Vt.a],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })(), Te = (() => {
            class t {
                constructor(t, e, i, s, n, a, r) {
                    this.translate = t, this.motorDataService = e, this.motorDbService = i, this.cameraSelectorService = s, this.calibrateService = n, this.barcodeService = a, this.rulerService = r, this.isSavingFocusDistance = !1, this.sliderStepWidth = 10, this.sliderStepDistance = 10, this.canCalibrateFocusDistance = !1, this.canSetFocus = !1, this.canCalibrateZoom = !1
                }

                ngOnInit() {
                    this.canCalibrateFocusDistance = this.cameraInfo.canCalibrateFocusDistance, this.canSetFocus = this.cameraInfo.canSetFocus, this.canCalibrateZoom = this.cameraInfo.canCalibrateZoom, this.subscriptions = [this.rulerService.rulerChanged.subscribe(t => this.ruler = t)]
                }

                ngOnDestroy() {
                    this.subscriptions.forEach(t => t.unsubscribe())
                }

                getZoomValue() {
                    return this.ruler * (this.calibrateService.distance / 1e3) * this.cameraInfo.pixelsize / (this.calibrateService.width / 1e3)
                }

                async scanBarcode() {
                    await this.barcodeService.scanWithGreyLevelRetry().catch(() => this.translate.get("WAR_CODE_NOT_FOUND").subscribe(t => alert(t)))
                }

                addPosition() {
                    this.isSavingFocusDistance = !0, this.calibrateService.addPosition(Number(this.getZoomValue()), () => {
                        this.isSavingFocusDistance = !1
                    })
                }

                saveFocusDistanceInfo() {
                    this.isSavingFocusDistance = !0, this.motorDbService.sendToDb("saveFocusDistanceInfo", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: [this.getZoomValue(), this.calibrateService.distance / 1e3, this.calibrateService.width / 1e3, this.calibrateService.rulerValue, this.calibrateService.pointsValue[0], this.calibrateService.pointsValue[1], this.calibrateService.pointsValue[2], this.calibrateService.pointsValue[3]].join(",")
                    }, t => {
                        !1 !== t.exec.result && t.execLib.result && !1 !== t.execLib.result ? (this.savedFocusDistance = Math.round(Number(this.getZoomValue())), this.cameraInfo.lensvalue = this.savedFocusDistance, this.lastSavedRulerValue = this.calibrateService.rulerValue) : alert("error"), this.isSavingFocusDistance = !1
                    }, () => {
                        this.isSavingFocusDistance = !1, alert("Error")
                    })
                }

                getSaveButtonText() {
                    return this.lastSavedRulerValue !== this.calibrateService.rulerValue ? this.translate.instant("SAVE_FOCUS") + " (" + this.getZoomValue().toFixed(2) + ")" : this.translate.instant("INFO_FOCUS_SAVED", {value: this.savedFocusDistance})
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(A.e), s.Ib(k), s.Ib(v), s.Ib(S), s.Ib(K), s.Ib(Mt), s.Ib($))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-calibratefocus"]],
                inputs: {cameraInfo: "cameraInfo"},
                decls: 24,
                vars: 37,
                consts: [["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor"], [1, "flex", "flex180"], [1, "flex", "flex-wide"], ["fieldWidth", "70px", 3, "disabled", "min", "max", "value", "minStep", "maxStep", "step", "showValue", "showMinMax", "showStep", "showTwist", "withFeedback", "valueChange"], ["role", "listitem"], ["mat-stroked-button", "", "color", "accent", 1, "full-width-button", 3, "disabled", "click"], ["mat-flat-button", "", "color", "primary", 1, "full-width-button", 3, "disabled", "click"]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "mat-list-item", 0), s.Ob(1, "div", 1), s.Ob(2, "div", 2), s.xc(3), s.ac(4, "translate"), s.Nb(), s.Ob(5, "div", 3), s.Ob(6, "app-increment", 4), s.Vb("valueChange", (function (t) {
                        return e.calibrateService.width = t
                    })), s.Nb(), s.Nb(), s.Nb(), s.Nb(), s.Ob(7, "mat-list-item", 5), s.Ob(8, "div", 1), s.Ob(9, "div", 2), s.xc(10), s.ac(11, "translate"), s.Nb(), s.Ob(12, "div", 3), s.Ob(13, "app-increment", 4), s.Vb("valueChange", (function (t) {
                        return e.calibrateService.distance = t
                    })), s.Nb(), s.Nb(), s.Nb(), s.Nb(), s.Ob(14, "mat-list-item", 5), s.Ob(15, "div", 1), s.Ob(16, "div", 3), s.Ob(17, "button", 6), s.Vb("click", (function () {
                        return e.scanBarcode()
                    })), s.xc(18), s.ac(19, "translate"), s.Nb(), s.Nb(), s.xc(20, " \xa0\xa0 "), s.Ob(21, "div", 3), s.Ob(22, "button", 7), s.Vb("click", (function () {
                        return e.saveFocusDistanceInfo()
                    })), s.xc(23), s.Nb(), s.Nb(), s.Nb(), s.Nb()), 2 & t && (s.wb(3), s.zc(" ", s.bc(4, 31, "WIDTH"), " "), s.wb(3), s.ec("disabled", !1)("min", .1)("max", 1e5)("value", e.calibrateService.width)("minStep", 1)("maxStep", 500)("step", 100)("showValue", !0)("showMinMax", !1)("showStep", !1)("showTwist", !1)("withFeedback", !0), s.wb(4), s.zc(" ", s.bc(11, 33, "DISTANCE"), " "), s.wb(3), s.ec("disabled", !1)("min", .1)("max", 1e7)("value", e.calibrateService.distance)("minStep", 1)("maxStep", 1e3)("step", 1e3)("showValue", !0)("showMinMax", !1)("showStep", !1)("showTwist", !1)("withFeedback", !0), s.wb(4), s.ec("disabled", 0 == e.ruler || e.isSavingFocusDistance), s.wb(1), s.Ac(" ", s.bc(19, 35, "SCAN_BARCODE"), " ", " (" + e.ruler + "px)", " "), s.wb(4), s.ec("disabled", 0 == e.ruler || e.isSavingFocusDistance), s.wb(1), s.zc(" ", e.getSaveButtonText(), " "))
                },
                directives: [ve.b, Pe, Vt.a],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();

        function Ne(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 7), s.Ob(1, "div", 8), s.Ob(2, "div", 9), s.xc(3), s.ac(4, "translate"), s.Nb(), s.Ob(5, "div", 1), s.Ob(6, "app-increment", 10), s.Vb("valueChange", (function (e) {
                    return s.oc(t), s.Zb(2).saveFocusDistance(e)
                })), s.Nb(), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(3), s.zc(" ", s.bc(4, 12, "FOCUS_DISTANCE_MM"), " "), s.wb(3), s.ec("disabled", t.inCalibrateMode)("showMinMax", !0)("min", 10)("max", 150)("value", t.cameraInfo.lensvalue)("minStep", 1)("maxStep", 1e3)("step", t.sliderStep)("showValue", !0)("showStep", !0)("showTwist", !0)
            }
        }

        function _e(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 11), s.Ob(1, "div", 8), s.Ob(2, "div", 1), s.Ob(3, "button", 12), s.Vb("click", (function () {
                    return s.oc(t), s.Zb(2).toggleShowCalibrateFocus()
                })), s.xc(4), s.ac(5, "translate"), s.Nb(), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(3), s.ec("color", t.inCalibrateMode ? "warn" : "primary"), s.wb(1), s.zc(" ", s.bc(5, 2, t.inCalibrateMode ? "CALIBRATE_MODE_OFF" : "CALIBRATE_MODE_ON"), " ")
            }
        }

        function Re(t, e) {
            if (1 & t && s.Jb(0, "app-calibratefocus", 13), 2 & t) {
                const t = s.Zb(2);
                s.ec("cameraInfo", t.cameraInfo)
            }
        }

        function Le(t, e) {
            if (1 & t && (s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.Ob(7, "mat-panel-description", 2), s.xc(8), s.ac(9, "translate"), s.Nb(), s.Nb(), s.Jb(10, "mat-divider"), s.Ob(11, "mat-list", 3), s.vc(12, Ne, 7, 14, "mat-list-item", 4), s.vc(13, _e, 6, 4, "mat-list-item", 5), s.vc(14, Re, 1, 1, "app-calibratefocus", 6), s.Nb(), s.Nb(), s.Nb()), 2 & t) {
                const t = s.Zb();
                s.wb(5), s.yc(s.bc(6, 6, "FOCUS_DISTANCE_MM")), s.wb(3), s.Ac(" ", s.bc(9, 8, "CURRENT_VALUE"), ": ", t.cameraInfo.lensvalue, " "), s.wb(4), s.ec("ngIf", t.cameraInfo.canSetFocus), s.wb(1), s.ec("ngIf", t.cameraInfo.canCalibrateFocusDistance), s.wb(1), s.ec("ngIf", t.inCalibrateMode)
            }
        }

        let Ae = (() => {
            class t extends fe {
                constructor() {
                    super(...arguments), this.sliderStep = 1
                }

                ngOnInit() {
                    this.calibrateService.inCalibrateMode.subscribe(t => {
                        this.inCalibrateMode = t
                    })
                }

                saveFocusDistance(t) {
                    this.motorDbService.sendToDb("saveFocusDistance", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, e => {
                        !1 !== e.execLib.result && (this.cameraInfo.lensvalue = t)
                    }, () => console.log("API: Failed to set focus distance"))
                }

                toggleShowCalibrateFocus() {
                    this.calibrateService.toggleShowCalibrateMode()
                }

                get detectedAuto() {
                    return 0 !== (this.motorDataService.motorZoom.allowedRange && this.motorDataService.motorZoom.singleDirection)
                }
            }

            return t.\u0275fac = function (e) {
                return ke(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-group-lens"]],
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], [2, "justify-content", "flex-end"], ["dense", "", "role", "list"], ["role", "listitem", "class", "mat-list-item-motor", 4, "ngIf"], ["role", "listitem", 4, "ngIf"], [3, "cameraInfo", 4, "ngIf"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor"], [1, "flex", "flex200"], ["fieldWidth", "70px", 3, "disabled", "showMinMax", "min", "max", "value", "minStep", "maxStep", "step", "showValue", "showStep", "showTwist", "valueChange"], ["role", "listitem"], ["mat-flat-button", "", 1, "full-width-button", 3, "color", "click"], [3, "cameraInfo"]],
                template: function (t, e) {
                    1 & t && s.vc(0, Le, 15, 10, "div", 0), 2 & t && s.ec("ngIf", (!e.motorDataService.motorZoom || e.motorDataService.motorZoom && !e.motorDataService.motorZoom.withFeedback || e.motorDataService.motorZoom && e.detectedAuto) && e.cameraInfo.canCalibrateFocusDistance && e.motorDataService.data.length)
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, pe.c, Se.a, ve.a, ve.b, Pe, Vt.a, Te],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const ke = s.Qb(Ae);
        var Fe = i("dFDq");

        function Ve(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-slide-toggle", 5), s.Vb("change", (function (e) {
                    return s.oc(t), s.Zb(2).onTurnAutoHandler(e)
                })), s.xc(1), s.ac(2, "translate"), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.ec("checked", !t.motor.isManual), s.wb(1), s.zc(" ", s.bc(2, 2, "AUTO"), " ")
            }
        }

        function Be(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 1), s.Ob(1, "div", 2), s.xc(2), s.ac(3, "translate"), s.Nb(), s.Ob(4, "div", 1), s.Ob(5, "app-increment", 3), s.Vb("valueChange", (function (e) {
                    return s.oc(t), s.Zb().valueChange(e)
                })), s.Nb(), s.vc(6, Ve, 3, 4, "mat-slide-toggle", 4), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(2), s.zc(" ", s.bc(3, 14, t.motor.name), " "), s.wb(3), s.ec("disabled", t.motor.isBusy || !t.motor.isManual)("showMinMax", t.motor.withFeedback)("min", t.motor.minValue)("max", t.motor.maxValue)("value", t.currentValue)("minStep", 1)("maxStep", 1e3)("step", t.motor.step)("showValue", t.motor.withFeedback)("showStep", !0)("showTwist", !0)("withFeedback", t.motor.withFeedback), s.wb(1), s.ec("ngIf", t.motor.canAuto)
            }
        }

        let Ze = (() => {
            class t {
                constructor(t) {
                    this.motorDbService = t, this.disabled = !1, this.changeEmmitter = new s.l, this.sliderStep = 10
                }

                get userValue() {
                    return this.currentValue ? this.currentValue : this.motor.withFeedback ? this.motor.userValue : 0
                }

                ngOnInit() {
                    this.init(), this.motorDbService.cameraInfo.subscribe(t => this.init())
                }

                init() {
                    this.motor.withFeedback ? (this.sliderStep = this.motor.step, this.currentValue = this.motor.userValue) : this.currentValue = 0
                }

                getMinValue() {
                    return this.motor.withFeedback ? this.motor.minValue : 0 - 5 * this.sliderStep
                }

                getMaxValue() {
                    return this.motor.withFeedback ? this.motor.maxValue : 0 + 5 * this.sliderStep
                }

                valueChange(t) {
                    const e = this.currentValue;
                    this.motor.withFeedback ? this.motor.setCurrentPosition(t).then(i => {
                        this.currentValue = i ? t : e, this.changeEmmitter.emit(this.currentValue)
                    }) : this.motor.spinMotor(t).then(t => {
                        console.log("spinMotor:", t, this.currentValue)
                    })
                }

                onTurnAutoHandler(t) {
                    this.motor.setManual(!t.checked)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(v))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-item"]],
                inputs: {motor: "motor", disabled: "disabled", currentValue: "currentValue"},
                outputs: {changeEmmitter: "changeEmmitter"},
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], [1, "flex", "flex180"], ["fieldWidth", "70px", 3, "disabled", "showMinMax", "min", "max", "value", "minStep", "maxStep", "step", "showValue", "showStep", "showTwist", "withFeedback", "valueChange"], ["color", "accent", 3, "checked", "change", 4, "ngIf"], ["color", "accent", 3, "checked", "change"]],
                template: function (t, e) {
                    1 & t && s.vc(0, Be, 7, 16, "div", 0), 2 & t && s.ec("ngIf", e.motor.cameraInfo)
                },
                directives: [Nt.g, Pe, Fe.a],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();

        function ze(t, e) {
            if (1 & t && (s.Ob(0, "mat-panel-description", 6), s.xc(1), s.ac(2, "translate"), s.Nb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.Ac(" ", s.bc(2, 2, "CURRENT_VALUE"), ": ", t.motorDataService.getMotorByType("IRIS").userValue, " ")
            }
        }

        function Ue(t, e) {
            if (1 & t && (s.Ob(0, "mat-panel-description", 6), s.xc(1), s.ac(2, "translate"), s.ac(3, "translate"), s.Nb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.Ac(" ", s.bc(2, 2, "CURRENT_VALUE"), ": ", s.bc(3, 4, t.cameraInfo.irismanual ? "MANUAL" : "AUTO"), " ")
            }
        }

        function He(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.vc(7, ze, 3, 4, "mat-panel-description", 2), s.vc(8, Ue, 4, 6, "mat-panel-description", 2), s.Nb(), s.Jb(9, "mat-divider"), s.Ob(10, "mat-list", 3), s.Ob(11, "mat-list-item", 4), s.Ob(12, "app-motor-item", 5), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Nb(), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(5), s.yc(s.bc(6, 4, "IRIS")), s.wb(2), s.ec("ngIf", t.motorDataService.getMotorByType("IRIS").withFeedback), s.wb(1), s.ec("ngIf", !t.motorDataService.getMotorByType("IRIS").withFeedback), s.wb(4), s.ec("motor", t.motorDataService.getMotorByType("IRIS"))
            }
        }

        let je = (() => {
            class t extends fe {
            }

            return t.\u0275fac = function (e) {
                return We(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-group-iris"]],
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], ["style", "justify-content: flex-end;", 4, "ngIf"], ["dense", "", "role", "list"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor", 3, "motor", "changeEmmitter"], [2, "justify-content", "flex-end"]],
                template: function (t, e) {
                    1 & t && s.vc(0, He, 13, 6, "div", 0), 2 & t && s.ec("ngIf", null !== e.motorDataService.getMotorByType("IRIS"))
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, Se.a, ve.a, ve.b, Ze, pe.c],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const We = s.Qb(je);

        function Ge(t, e) {
            if (1 & t && (s.Ob(0, "mat-panel-description", 7), s.xc(1), s.ac(2, "translate"), s.Nb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.Ac(" ", s.bc(2, 2, "CURRENT_VALUE"), ": ", t.cameraInfo.focus, " ")
            }
        }

        function Ye(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 8), s.Ob(1, "div", 9), s.xc(2), s.ac(3, "translate"), s.Nb(), s.Ob(4, "div", 10), s.Ob(5, "button", 11), s.Vb("click", (function () {
                    return s.oc(t), s.Zb(2).saveProfile("CITY")
                })), s.xc(6), s.ac(7, "translate"), s.Nb(), s.Nb(), s.Ob(8, "div", 10), s.Ob(9, "button", 11), s.Vb("click", (function () {
                    return s.oc(t), s.Zb(2).saveProfile("TRACK")
                })), s.xc(10), s.ac(11, "translate"), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(2), s.yc(s.bc(3, 5, "SAVE_FOCUS_CITY_TRACK")), s.wb(3), s.ec("color", t.cameraInfo.profileFocusCity > 0 ? "primary" : "warn"), s.wb(1), s.zc(" ", s.bc(7, 7, "CITY"), " "), s.wb(3), s.ec("color", t.cameraInfo.profileFocusTrack > 0 ? "primary" : "warn"), s.wb(1), s.zc(" ", s.bc(11, 9, "TRACK"), " ")
            }
        }

        function qe(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "button", 13), s.Vb("click", (function () {
                    return s.oc(t), s.Zb(3).calibrateMinMax()
                })), s.xc(1), s.ac(2, "translate"), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(3);
                s.ec("color", t.cameraInfo.calibratedMaxFocus > 0 ? "primary" : "warn"), s.wb(1), s.zc(" ", s.bc(2, 2, "DETECT_FOCUS_POSITION"), " ")
            }
        }

        function Xe(t, e) {
            if (1 & t && (s.Ob(0, "div", 1), s.vc(1, qe, 3, 4, "button", 12), s.Nb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("ngIf", t.cameraInfo.canCalibrateMinMaxFocus)
            }
        }

        function Je(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.vc(7, Ge, 3, 4, "mat-panel-description", 2), s.Nb(), s.Jb(8, "mat-divider"), s.Ob(9, "mat-list", 3), s.Ob(10, "mat-list-item", 4), s.Ob(11, "app-motor-item", 5), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Nb(), s.Nb(), s.vc(12, Ye, 12, 11, "div", 6), s.vc(13, Xe, 2, 1, "div", 0), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(5), s.yc(s.bc(6, 5, "FOCUS")), s.wb(2), s.ec("ngIf", t.motorDataService.getMotorByType("FOCUS").withFeedback), s.wb(4), s.ec("motor", t.motorDataService.getMotorByType("FOCUS")), s.wb(1), s.ec("ngIf", t.isDetectedFocus && t.cameraInfo.accessProfileFocus && t.cameraInfo.calibratedMaxFocus > 0), s.wb(1), s.ec("ngIf", t.isDetectedFocus)
            }
        }

        let Qe = (() => {
            class t extends fe {
                constructor() {
                    super(...arguments), this.isDetectedFocus = !0
                }

                calibrateMinMax() {
                    this.motorDataService.getMotorByType("FOCUS").calibrate()
                }

                saveProfile(t) {
                    const e = this.motorDataService.getMotorByType("FOCUS").getCurrentPosition();
                    this.motorDataService.getMotorByType("FOCUS").saveProfile(t, e)
                }
            }

            return t.\u0275fac = function (e) {
                return $e(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-group-focus"]],
                inputs: {isDetectedFocus: "isDetectedFocus"},
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], ["style", "justify-content: flex-end;", 4, "ngIf"], ["dense", "", "role", "list"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor", 3, "motor", "changeEmmitter"], ["class", "flex-profile-city-track", 4, "ngIf"], [2, "justify-content", "flex-end"], [1, "flex-profile-city-track"], [1, "flex-save"], [1, "flex-button"], ["mat-flat-button", "", 1, "width-100", 3, "color", "click"], ["mat-flat-button", "", "class", "full-width-button", 3, "color", "click", 4, "ngIf"], ["mat-flat-button", "", 1, "full-width-button", 3, "color", "click"]],
                template: function (t, e) {
                    1 & t && s.vc(0, Je, 14, 7, "div", 0), 2 & t && s.ec("ngIf", e.motorDataService.getMotorByType("FOCUS"))
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, Se.a, ve.a, ve.b, Ze, pe.c, Vt.a],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const $e = s.Qb(Qe);

        function Ke(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.Ob(7, "mat-panel-description", 2), s.xc(8), s.ac(9, "translate"), s.Nb(), s.Nb(), s.Jb(10, "mat-divider"), s.Ob(11, "mat-list", 3), s.Ob(12, "mat-list-item", 4), s.Ob(13, "app-motor-item", 5), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Nb(), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(5), s.yc(s.bc(6, 4, "FOCUS_BY_DISTANCE")), s.wb(3), s.Ac(" ", s.bc(9, 6, "CURRENT_VALUE"), ": ", t.cameraInfo.focusByDistanceMM, " "), s.wb(5), s.ec("motor", t.motorDataService.getMotorByType("FOCUS_BY_DISTANCE"))
            }
        }

        let ti = (() => {
            class t extends fe {
            }

            return t.\u0275fac = function (e) {
                return ei(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-focus-by-distance"]],
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], [2, "justify-content", "flex-end"], ["dense", "", "role", "list"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor", 3, "motor", "changeEmmitter"]],
                template: function (t, e) {
                    1 & t && s.vc(0, Ke, 14, 8, "div", 0), 2 & t && s.ec("ngIf", e.motorDataService.getMotorByType("FOCUS_BY_DISTANCE"))
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, pe.c, Se.a, ve.a, ve.b, Ze],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const ei = s.Qb(ti);

        function ii(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.Ob(7, "mat-panel-description", 2), s.xc(8), s.ac(9, "translate"), s.Nb(), s.Nb(), s.Ob(10, "mat-list", 3), s.Ob(11, "mat-list-item", 4), s.Ob(12, "app-motor-item", 5), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Nb(), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(5), s.yc(s.bc(6, 4, "TILT")), s.wb(3), s.Ac(" ", s.bc(9, 6, "CURRENT_VALUE"), ": ", t.motorDataService.getMotorByType("TILT").getCurrentPosition(), " "), s.wb(4), s.ec("motor", t.motorDataService.getMotorByType("TILT"))
            }
        }

        let si = (() => {
            class t extends fe {
            }

            return t.\u0275fac = function (e) {
                return ni(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-group-tilt"]],
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], [2, "justify-content", "flex-end"], ["dense", "", "role", "list"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor", 3, "motor", "changeEmmitter"]],
                template: function (t, e) {
                    1 & t && s.vc(0, ii, 13, 8, "div", 0), 2 & t && s.ec("ngIf", e.cameraInfo.canSetTilt && null !== e.motorDataService.getMotorByType("TILT"))
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, pe.c, ve.a, ve.b, Ze],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const ni = s.Qb(si);
        var ai = i("t/D7"), ri = i("laIt"), oi = i("bjZM");

        function ci(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 3), s.Ob(1, "button", 23), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().addPosition()
                })), s.xc(2), s.ac(3, "translate"), s.Nb(), s.xc(4, " \xa0\xa0 "), s.Ob(5, "button", 23), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().saveFocusDistanceInfo()
                })), s.xc(6), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(1), s.ec("disabled", 0 == t.ruler || t.isSavingFocusDistance), s.wb(1), s.zc(" ", s.bc(3, 4, "FOCUS_ADD_POSITION"), " "), s.wb(3), s.ec("disabled", 0 == t.ruler || t.isSavingFocusDistance), s.wb(1), s.zc(" ", t.getSaveButtonText(), " REIKA ")
            }
        }

        function li(t, e) {
            1 & t && (s.Ob(0, "div", 24), s.Jb(1, "mat-spinner", 25), s.Nb()), 2 & t && (s.wb(1), s.ec("mode", "indeterminate"))
        }

        function hi(t, e) {
            1 & t && (s.Ob(0, "mat-header-cell", 26), s.xc(1), s.ac(2, "translate"), s.Nb()), 2 & t && (s.wb(1), s.zc(" ", s.bc(2, 1, "FOCUS_PARROTS"), " "))
        }

        function ui(t, e) {
            if (1 & t && (s.Ob(0, "mat-cell", 27), s.xc(1), s.Nb()), 2 & t) {
                const t = e.$implicit;
                s.wb(1), s.zc(" ", t.position, " ")
            }
        }

        function di(t, e) {
            1 & t && (s.Ob(0, "mat-header-cell", 28), s.xc(1), s.ac(2, "translate"), s.Nb()), 2 & t && (s.wb(1), s.zc(" ", s.bc(2, 1, "FOCUS_DISTANCE"), " "))
        }

        function mi(t, e) {
            if (1 & t && (s.Ob(0, "mat-cell", 29), s.xc(1), s.Nb()), 2 & t) {
                const t = e.$implicit;
                s.wb(1), s.zc(" ", t.value, " ")
            }
        }

        function bi(t, e) {
            1 & t && s.Jb(0, "mat-header-cell", 30)
        }

        function gi(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-cell", 31), s.Ob(1, "button", 32), s.Vb("click", (function () {
                    s.oc(t);
                    const i = e.$implicit;
                    return s.Zb().deletePosition(i)
                })), s.Ob(2, "mat-icon"), s.xc(3, "delete_outline"), s.Nb(), s.Nb(), s.Nb()
            }
        }

        function fi(t, e) {
            1 & t && s.Jb(0, "mat-header-row")
        }

        function pi(t, e) {
            1 & t && s.Jb(0, "mat-row")
        }

        const Si = function () {
            return ["position", "value", "actions"]
        };
        let vi = (() => {
            class t {
                constructor(t, e, i, s, n, a) {
                    this.calibrateService = t, this.translate = e, this.motorDataService = i, this.motorDbService = s, this.cameraSelectorService = n, this.barcodeService = a, this.isSavingFocusDistance = !1, this.sliderStepWidth = 10, this.sliderStepDistance = 10, this.canCalibrateFocusDistance = !1, this.canSetFocus = !1, this.canCalibrateZoom = !1, this.calibratePointsSource = new ri.k
                }

                ngOnInit() {
                    this.canCalibrateFocusDistance = this.cameraInfo.canCalibrateFocusDistance, this.canSetFocus = this.cameraInfo.canSetFocus, this.canCalibrateZoom = this.cameraInfo.canCalibrateZoom, this.calibrateService.getData().then(t => {
                        this.calibratePointsSource.data = t, this.calibratePointsSource.sort = this.sort
                    })
                }

                get ruler() {
                    return this.calibrateService.rulerValue
                }

                getZoomValue() {
                    return this.ruler * (this.calibrateService.distance / 1e3) * this.cameraInfo.pixelsize / (this.calibrateService.width / 1e3)
                }

                async scanBarcode() {
                    await this.barcodeService.scan().catch(() => this.translate.get("WAR_CODE_NOT_FOUND").subscribe(t => alert(t)))
                }

                addPosition() {
                    this.isSavingFocusDistance = !0, this.calibrateService.addPosition(Number(this.getZoomValue()), () => {
                        this.isSavingFocusDistance = !1, this.calibratePointsSource.data = this.calibrateService.data
                    })
                }

                deletePosition(t) {
                    this.calibrateService.deletePosition(this.calibrateService.data.indexOf(t), () => {
                        this.isSavingFocusDistance = !1, this.calibratePointsSource.data = this.calibrateService.data
                    })
                }

                saveFocusDistanceInfo() {
                    this.isSavingFocusDistance = !0, this.motorDbService.sendToDb("saveFocusDistanceInfo", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: [this.getZoomValue(), this.calibrateService.distance / 1e3, this.calibrateService.width / 1e3, this.calibrateService.rulerValue, this.calibrateService.pointsValue[0], this.calibrateService.pointsValue[1], this.calibrateService.pointsValue[2], this.calibrateService.pointsValue[3]].join(",")
                    }, t => {
                        !1 !== t.exec.result && t.execLib.result && !1 !== t.execLib.result ? (this.savedFocusDistance = Math.round(Number(this.getZoomValue())), this.cameraInfo.lensvalue = this.savedFocusDistance, this.lastSavedRulerValue = this.calibrateService.rulerValue) : alert("error"), this.isSavingFocusDistance = !1
                    }, () => {
                        this.isSavingFocusDistance = !1, alert("Error")
                    })
                }

                getSaveButtonText() {
                    return this.lastSavedRulerValue !== this.calibrateService.rulerValue ? this.translate.instant("SAVE_FOCUS") + " (" + this.getZoomValue().toFixed(2) + ")" : this.translate.instant("INFO_FOCUS_SAVED", {value: this.savedFocusDistance})
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(K), s.Ib(A.e), s.Ib(k), s.Ib(v), s.Ib(S), s.Ib(Mt))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-calibrate"]],
                viewQuery: function (t, e) {
                    var i;
                    1 & t && s.tc(ai.a, !0), 2 & t && s.kc(i = s.Wb()) && (e.sort = i.first)
                },
                inputs: {cameraInfo: "cameraInfo"},
                decls: 38,
                vars: 42,
                consts: [["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor"], [1, "flex", "flex180"], [1, "flex", "flex-wide"], ["fieldWidth", "70px", 3, "disabled", "min", "max", "value", "minStep", "maxStep", "step", "showValue", "showMinMax", "showStep", "showTwist", "withFeedback", "valueChange"], ["role", "listitem"], ["mat-stroked-button", "", "color", "accent", 1, "full-width-button", 3, "disabled", "click"], ["class", "flex flex-wide", 4, "ngIf"], [2, "position", "relative"], ["class", "overlay", 4, "ngIf"], ["matSort", "", 1, "mat-table", 3, "dataSource"], ["deviceListTable", ""], ["matColumnDef", "position"], ["mat-sort-header", "", "style", "max-width: 180px;", 4, "matHeaderCellDef"], ["style", "max-width: 180px;", 4, "matCellDef"], ["matColumnDef", "value"], ["mat-sort-header", "", "style", "max-width: 200px;", 4, "matHeaderCellDef"], ["style", "max-width: 220px;", 4, "matCellDef"], ["matColumnDef", "actions"], ["mat-sort-header", "", "style", "max-width: 160px;", 4, "matHeaderCellDef"], ["style", "max-width: 60px; justify-content: flex-end;", 4, "matCellDef"], [4, "matHeaderRowDef"], [4, "matRowDef", "matRowDefColumns"], ["mat-flat-button", "", "color", "primary", 1, "full-width-button", 3, "disabled", "click"], [1, "overlay"], [3, "mode"], ["mat-sort-header", "", 2, "max-width", "180px"], [2, "max-width", "180px"], ["mat-sort-header", "", 2, "max-width", "200px"], [2, "max-width", "220px"], ["mat-sort-header", "", 2, "max-width", "160px"], [2, "max-width", "60px", "justify-content", "flex-end"], ["mat-icon-button", "", 3, "click"]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "mat-list-item", 0), s.Ob(1, "div", 1), s.Ob(2, "div", 2), s.xc(3), s.ac(4, "translate"), s.Nb(), s.Ob(5, "div", 3), s.Ob(6, "app-increment", 4), s.Vb("valueChange", (function (t) {
                        return e.calibrateService.width = t
                    })), s.Nb(), s.Nb(), s.Nb(), s.Nb(), s.Ob(7, "mat-list-item", 5), s.Ob(8, "div", 1), s.Ob(9, "div", 2), s.xc(10), s.ac(11, "translate"), s.Nb(), s.Ob(12, "div", 3), s.Ob(13, "app-increment", 4), s.Vb("valueChange", (function (t) {
                        return e.calibrateService.distance = t
                    })), s.Nb(), s.Nb(), s.Nb(), s.Nb(), s.Ob(14, "mat-list-item", 5), s.Ob(15, "div", 1), s.Ob(16, "div", 3), s.Ob(17, "button", 6), s.Vb("click", (function () {
                        return e.scanBarcode()
                    })), s.xc(18), s.ac(19, "translate"), s.Nb(), s.Nb(), s.Nb(), s.Nb(), s.Ob(20, "mat-list-item", 5), s.Ob(21, "div", 1), s.vc(22, ci, 7, 6, "div", 7), s.Nb(), s.Nb(), s.Ob(23, "div", 8), s.vc(24, li, 2, 1, "div", 9), s.Ob(25, "mat-table", 10, 11), s.Mb(27, 12), s.vc(28, hi, 3, 3, "mat-header-cell", 13), s.vc(29, ui, 2, 1, "mat-cell", 14), s.Lb(), s.Mb(30, 15), s.vc(31, di, 3, 3, "mat-header-cell", 16), s.vc(32, mi, 2, 1, "mat-cell", 17), s.Lb(), s.Mb(33, 18), s.vc(34, bi, 1, 0, "mat-header-cell", 19), s.vc(35, gi, 4, 0, "mat-cell", 20), s.Lb(), s.vc(36, fi, 1, 0, "mat-header-row", 21), s.vc(37, pi, 1, 0, "mat-row", 22), s.Nb(), s.Nb()), 2 & t && (s.wb(3), s.zc(" ", s.bc(4, 34, "WIDTH"), " "), s.wb(3), s.ec("disabled", !1)("min", .1)("max", 1e5)("value", e.calibrateService.width)("minStep", 1)("maxStep", 500)("step", 100)("showValue", !0)("showMinMax", !1)("showStep", !0)("showTwist", !1)("withFeedback", !0), s.wb(4), s.zc(" ", s.bc(11, 36, "DISTANCE"), " "), s.wb(3), s.ec("disabled", !1)("min", .1)("max", 1e7)("value", e.calibrateService.distance)("minStep", 1)("maxStep", 1e3)("step", 1e3)("showValue", !0)("showMinMax", !1)("showStep", !0)("showTwist", !1)("withFeedback", !0), s.wb(4), s.ec("disabled", 0 == e.ruler || e.isSavingFocusDistance), s.wb(1), s.Ac(" ", s.bc(19, 38, "SCAN_BARCODE"), " ", " (" + e.ruler + "px)", " "), s.wb(4), s.ec("ngIf", e.motorDataService.canZoomCalibration() && e.canCalibrateZoom), s.wb(2), s.ec("ngIf", e.calibrateService.isBusy), s.wb(1), s.ec("dataSource", e.calibratePointsSource), s.wb(11), s.ec("matHeaderRowDef", s.hc(40, Si)), s.wb(1), s.ec("matRowDefColumns", s.hc(41, Si)))
                },
                directives: [ve.b, Pe, Vt.a, Nt.g, ri.j, ai.a, ri.c, ri.e, ri.b, ri.g, ri.i, oi.c, ri.d, ai.b, ri.a, Bt.a, ri.f, ri.h],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();

        function wi(t, e) {
            if (1 & t && (s.Ob(0, "mat-panel-description", 7), s.xc(1), s.ac(2, "translate"), s.Nb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.Ac(" ", s.bc(2, 2, "CURRENT_VALUE"), ": ", t.showMotorZoom ? t.cameraInfo.zoomPos : t.cameraInfo.zoomPosMM, " ")
            }
        }

        function xi(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 8), s.Ob(1, "app-motor-item", 9, 10), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb(2).onChangeZoomPos(e)
                })), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("motor", t.motorDataService.motorZoom)("currentValue", t.cameraInfo.zoomPos)
            }
        }

        function Ci(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 8), s.Ob(1, "app-motor-item", 9, 11), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb(2).onChangeZoomPos(e)
                })), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("motor", t.motorDataService.motorZoomMM)("currentValue", t.cameraInfo.zoomPosMM)
            }
        }

        function yi(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 1), s.Ob(1, "button", 12), s.Vb("click", (function () {
                    return s.oc(t), s.Zb(2).calibrateMinMax()
                })), s.xc(2), s.ac(3, "translate"), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("color", t.cameraInfo.calibratedMaxZoom > 0 ? "primary" : "warn"), s.wb(1), s.zc(" ", s.bc(3, 2, "DETECT_ZOOM_POSITION"), " ")
            }
        }

        function Oi(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 15), s.Ob(1, "div", 16), s.Ob(2, "div", 1), s.Ob(3, "button", 12), s.Vb("click", (function () {
                    return s.oc(t), s.Zb(3).toggleShowCalibrateFocus()
                })), s.xc(4), s.ac(5, "translate"), s.Nb(), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(3);
                s.wb(3), s.ec("color", t.inCalibrateMode ? "warn" : "primary"), s.wb(1), s.zc(" ", s.bc(5, 2, t.inCalibrateMode ? "CALIBRATE_MODE_OFF" : "CALIBRATE_MODE_ON"), " ")
            }
        }

        function Ii(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "app-calibrate", 17), s.Vb("cameraInfoChange", (function (e) {
                    return s.oc(t), s.Zb(3).cameraInfo = e
                })), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(3);
                s.ec("cameraInfo", t.cameraInfo)
            }
        }

        function Ei(t, e) {
            if (1 & t && (s.vc(0, Oi, 6, 4, "mat-list-item", 13), s.vc(1, Ii, 1, 1, "app-calibrate", 14)), 2 & t) {
                const t = s.Zb(2);
                s.ec("ngIf", t.cameraInfo.canCalibrateZoom && t.motorDataService.motorZoom.withFeedback), s.wb(1), s.ec("ngIf", t.cameraInfo.canCalibrateZoom && t.motorDataService.motorZoom.withFeedback && t.inCalibrateMode)
            }
        }

        function Mi(t, e) {
            if (1 & t && (s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.vc(7, wi, 3, 4, "mat-panel-description", 2), s.Nb(), s.Jb(8, "mat-divider"), s.Ob(9, "mat-list", 3), s.vc(10, xi, 3, 2, "mat-list-item", 4), s.vc(11, Ci, 3, 2, "mat-list-item", 4), s.vc(12, yi, 4, 4, "div", 5), s.vc(13, Ei, 2, 2, "ng-template", null, 6, s.wc), s.Nb(), s.Nb(), s.Nb()), 2 & t) {
                const t = s.lc(14), e = s.Zb();
                s.wb(5), s.yc(s.bc(6, 6, e.showMotorZoomMM ? "ZOOM_MM" : "ZOOM")), s.wb(2), s.ec("ngIf", e.showMotorZoom || e.showMotorZoomMM), s.wb(3), s.ec("ngIf", !e.showMotorZoomMM), s.wb(1), s.ec("ngIf", e.showMotorZoomMM), s.wb(1), s.ec("ngIf", e.detectedAuto)("ngIfElse", t)
            }
        }

        let Di = (() => {
            class t extends fe {
                ngOnInit() {
                    this.subscriptions = [], this.subscriptions.push(this.calibrateService.inCalibrateMode.subscribe(t => {
                        this.inCalibrateMode = t
                    })), this.subscriptions.push(this.motorDbService.cameraInfo.subscribe(t => {
                        this.cameraInfo = t
                    }))
                }

                ngOnDestroy() {
                    this.subscriptions.forEach(t => t.unsubscribe())
                }

                calibrateMinMax() {
                    this.motorDataService.getMotorByType("ZOOM").calibrate()
                }

                onChangeZoomPos(t) {
                    this.motorDbService.refreshData(!0)
                }

                get showMotorZoom() {
                    return (this.motorDataService.canZoomCalibration() && !this.motorDataService.hasZoomCalibrated() || this.inCalibrateMode) && this.motorDataService.motorZoom && this.motorDataService.motorZoom.withFeedback
                }

                get showMotorZoomMM() {
                    return !this.inCalibrateMode && this.motorDataService.hasZoomCalibrated()
                }

                toggleShowCalibrateFocus() {
                    this.calibrateService.toggleShowCalibrateMode()
                }

                get detectedAuto() {
                    return this.motorDataService.motorZoom.allowedRange && this.motorDataService.motorZoom.singleDirection
                }
            }

            return t.\u0275fac = function (e) {
                return Pi(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-group-zoom"]],
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], ["style", "justify-content: flex-end;", 4, "ngIf"], ["dense", "", "role", "list"], ["role", "listitem", "class", "mat-list-item-motor", 4, "ngIf"], ["class", "flex flex-wide", 4, "ngIf", "ngIfElse"], ["blockWithFeedback", ""], [2, "justify-content", "flex-end"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor", 3, "motor", "currentValue", "changeEmmitter"], ["motorZoomComponent", ""], ["motorZoomMMComponent", ""], ["mat-flat-button", "", 1, "full-width-button", 3, "color", "click"], ["role", "listitem", 4, "ngIf"], [3, "cameraInfo", "cameraInfoChange", 4, "ngIf"], ["role", "listitem"], [1, "app-motor"], [3, "cameraInfo", "cameraInfoChange"]],
                template: function (t, e) {
                    1 & t && s.vc(0, Mi, 15, 8, "div", 0), 2 & t && s.ec("ngIf", null !== e.motorDataService.motorZoom && e.motorDataService.data.length)
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, Se.a, ve.a, pe.c, ve.b, Ze, Vt.a, vi],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const Pi = s.Qb(Di);

        function Ti(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 5), s.Ob(1, "app-motor-item", 6), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb(2).onChange(e)
                })), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("motor", t.motorDataService.getMotorByType("SHORT_EXPOSURE"))("disabled", !t.motorDataService.getMotorByType("SHORT_EXPOSURE").isManual)
            }
        }

        function Ni(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 5), s.Ob(1, "app-motor-item", 6), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb(2).onChange(e)
                })), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("motor", t.motorDataService.getMotorByType("LONG_EXPOSURE"))("disabled", !t.motorDataService.getMotorByType("LONG_EXPOSURE").isManual)
            }
        }

        function _i(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 5), s.Ob(1, "app-motor-item", 6), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb(2).onChange(e)
                })), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("motor", t.motorDataService.getMotorByType("BEST_EXPOSURE"))("disabled", !t.motorDataService.getMotorByType("BEST_EXPOSURE").isManual)
            }
        }

        function Ri(t, e) {
            if (1 & t && (s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.Ob(7, "mat-panel-description", 2), s.xc(8), s.ac(9, "translate"), s.Nb(), s.Nb(), s.Jb(10, "mat-divider"), s.Ob(11, "mat-list", 3), s.vc(12, Ti, 2, 2, "mat-list-item", 4), s.Jb(13, "mat-divider"), s.vc(14, Ni, 2, 2, "mat-list-item", 4), s.Jb(15, "mat-divider"), s.vc(16, _i, 2, 2, "mat-list-item", 4), s.Nb(), s.Nb(), s.Nb()), 2 & t) {
                const t = s.Zb();
                s.wb(5), s.yc(s.bc(6, 6, "EXPOSURE")), s.wb(3), s.Ac(" ", s.bc(9, 8, "CURRENT_VALUE"), ": ", t.cameraInfo.currentExposure, " "), s.wb(4), s.ec("ngIf", null !== t.motorDataService.getMotorByType("SHORT_EXPOSURE")), s.wb(2), s.ec("ngIf", null !== t.motorDataService.getMotorByType("LONG_EXPOSURE")), s.wb(2), s.ec("ngIf", null !== t.motorDataService.getMotorByType("BEST_EXPOSURE"))
            }
        }

        let Li = (() => {
            class t extends fe {
            }

            return t.\u0275fac = function (e) {
                return Ai(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-group-exposure"]],
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], [2, "justify-content", "flex-end"], ["dense", "", "role", "list"], ["role", "listitem", "class", "mat-list-item-motor", 4, "ngIf"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor", 3, "motor", "disabled", "changeEmmitter"]],
                template: function (t, e) {
                    1 & t && s.vc(0, Ri, 17, 10, "div", 0), 2 & t && s.ec("ngIf", e.cameraInfo.hasExposure && e.motorDataService.data.length)
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, pe.c, Se.a, ve.a, ve.b, Ze],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const Ai = s.Qb(Li);
        var ki = i("PUIy"), Fi = i("jHnc"), Vi = i("1rLY");

        function Bi(t, e) {
            1 & t && (s.Ob(0, "mat-option"), s.xc(1), s.ac(2, "translate"), s.Nb()), 2 & t && (s.wb(1), s.yc(s.bc(2, 1, "NOT_CHOSEN")))
        }

        function Zi(t, e) {
            if (1 & t && (s.Ob(0, "mat-option", 7), s.xc(1), s.ac(2, "translate"), s.Nb()), 2 & t) {
                const t = e.$implicit;
                s.fc("value", t), s.wb(1), s.yc(s.bc(2, 2, "IRF_" + t.toLocaleUpperCase()))
            }
        }

        let zi = (() => {
            class t {
                constructor() {
                    this.disabled = !1
                }

                ngOnInit() {
                    this.currentValue = this.data.irfon
                }

                motorChanged() {
                    this.motor.setCurrentPosition(this.data.irAutoMode)
                }

                get checkModeInSelected() {
                    return !!this.data.listMode && !this.data.listMode.find(t => t == this.data.irAutoMode)
                }

                changeIrFilter() {
                    this.motor.setIrFilterStatus(this.data.irfon)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-irf"]],
                inputs: {motor: "motor", disabled: "disabled", data: "data"},
                decls: 14,
                vars: 11,
                consts: [[2, "display", "block"], [2, "text-align", "left"], [2, "margin-right", "8px", 3, "ngModel", "disabled", "ngModelChange", "change"], [2, "margin-top", "8px"], [3, "ngModel", "ngModelChange"], [4, "ngIf"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "div", 0), s.Ob(1, "div", 1), s.Ob(2, "section"), s.Ob(3, "mat-checkbox", 2), s.Vb("ngModelChange", (function (t) {
                        return e.data.irfon = t
                    }))("change", (function () {
                        return e.changeIrFilter()
                    })), s.xc(4), s.ac(5, "translate"), s.Nb(), s.Nb(), s.Nb(), s.Ob(6, "div", 3), s.Ob(7, "mat-form-field"), s.Ob(8, "mat-label"), s.xc(9), s.ac(10, "translate"), s.Nb(), s.Ob(11, "mat-select", 4), s.Vb("ngModelChange", (function (t) {
                        return e.data.irAutoMode = t
                    }))("ngModelChange", (function () {
                        return e.motorChanged()
                    })), s.vc(12, Bi, 3, 3, "mat-option", 5), s.vc(13, Zi, 3, 4, "mat-option", 6), s.Nb(), s.Nb(), s.Nb(), s.Nb()), 2 & t && (s.wb(3), s.ec("ngModel", e.data.irfon)("disabled", "day" == e.data.irAutoMode || "night" == e.data.irAutoMode || "sun" == e.data.irAutoMode), s.wb(1), s.yc(s.bc(5, 7, "IR_FILTER")), s.wb(5), s.yc(s.bc(10, 9, "MODE")), s.wb(2), s.ec("ngModel", e.data.irAutoMode), s.wb(1), s.ec("ngIf", e.checkModeInSelected), s.wb(1), s.ec("ngForOf", e.data.listMode))
                },
                directives: [ki.a, Ce.h, Ce.j, we.b, we.e, Fi.a, Nt.g, Nt.f, Vi.o],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();

        function Ui(t, e) {
            if (1 & t && (s.Mb(0), s.xc(1), s.ac(2, "translate"), s.Lb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.zc(" ", s.bc(2, 1, t.getIrLabel), " ")
            }
        }

        function Hi(t, e) {
            if (1 & t && (s.Mb(0), s.xc(1), s.ac(2, "translate"), s.ac(3, "translate"), s.Lb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.Ac(" / ", s.bc(2, 2, "IR_FILTER"), ": ", s.bc(3, 4, t.cameraInfo.irfon ? "IRF_STATUS_ON" : "IRF_STATUS_OFF"), " ")
            }
        }

        function ji(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 6), s.Ob(1, "app-motor-irf", 7), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb(2).onChange(e)
                })), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("motor", t.motorDataService.motorIRF)("data", t.cameraInfo)
            }
        }

        function Wi(t, e) {
            if (1 & t && (s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.Ob(7, "mat-panel-description", 2), s.xc(8), s.ac(9, "translate"), s.vc(10, Ui, 3, 3, "ng-container", 3), s.vc(11, Hi, 4, 6, "ng-container", 3), s.Nb(), s.Nb(), s.Jb(12, "mat-divider"), s.Ob(13, "mat-list", 4), s.vc(14, ji, 2, 2, "mat-list-item", 5), s.Nb(), s.Nb(), s.Nb()), 2 & t) {
                const t = s.Zb();
                s.wb(5), s.yc(s.bc(6, 5, "IR")), s.wb(3), s.zc(" ", s.bc(9, 7, "MODE"), ": "), s.wb(2), s.ec("ngIf", t.motorDataService.getMotorByType("IRF")), s.wb(1), s.ec("ngIf", t.cameraInfo.irAutoMode), s.wb(3), s.ec("ngIf", null != t.motorDataService.motorIRF)
            }
        }

        let Gi = (() => {
            class t extends fe {
                get canShowComponent() {
                    return this.motorDataService.data.length > 0 && null !== this.motorDataService.getMotorByType("IRF")
                }

                get getIrLabel() {
                    return this.cameraInfo.irAutoMode ? this.translateService.instant("IRF_" + this.cameraInfo.irAutoMode.toLocaleUpperCase()) : ""
                }
            }

            return t.\u0275fac = function (e) {
                return Yi(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-mode-ir"]],
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], [2, "justify-content", "flex-end"], [4, "ngIf"], ["dense", "", "role", "list"], ["role", "listitem", "class", "mat-list-item-motor", 4, "ngIf"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor", 3, "motor", "data", "changeEmmitter"]],
                template: function (t, e) {
                    1 & t && s.vc(0, Wi, 15, 9, "div", 0), 2 & t && s.ec("ngIf", e.canShowComponent)
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, pe.c, Se.a, ve.a, ve.b, zi],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const Yi = s.Qb(Gi), qi = ["selectElement"];

        function Xi(t, e) {
            if (1 & t && (s.Ob(0, "option", 6), s.xc(1), s.ac(2, "translate"), s.Nb()), 2 & t) {
                const t = e.$implicit, i = s.Zb();
                s.ec("value", t)("selected", t === i.cameraInfo.irAutoOff), s.wb(1), s.zc(" ", s.bc(2, 3, "IR_AUTO_OFF." + t), " ")
            }
        }

        let Ji = (() => {
            class t {
                constructor(t, e) {
                    this.motorDbService = t, this.cameraSelectorService = e, this.modes = ["AUTO", "OFF"], this.changeEmmitter = new s.l
                }

                setSelectedMode(t) {
                    this.motorDbService.sendToDb("setIrAutoOff", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, e => {
                        !0 === e.execLib.result ? (this.cameraInfo.irAutoOff = t, this.changeEmmitter.emit(t)) : this.select.nativeElement.value = t
                    })
                }

                ngOnInit() {
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(v), s.Ib(S))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-ir-auto-off"]],
                viewQuery: function (t, e) {
                    var i;
                    1 & t && s.tc(qi, !0), 2 & t && s.kc(i = s.Wb()) && (e.select = i.first)
                },
                inputs: {cameraInfo: "cameraInfo"},
                outputs: {changeEmmitter: "changeEmmitter"},
                decls: 9,
                vars: 4,
                consts: [[1, "flex", "flex180"], [1, "flex", "flex-wide", "align-right"], [2, "padding", "8px"], [1, "select", "flex", "flex180", "bordered", 3, "change"], ["selectElement", ""], [3, "value", "selected", 4, "ngFor", "ngForOf"], [3, "value", "selected"]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "div", 0), s.Ob(1, "h4"), s.xc(2), s.ac(3, "translate"), s.Nb(), s.Nb(), s.Ob(4, "div", 1), s.Ob(5, "div", 2), s.Ob(6, "select", 3, 4), s.Vb("change", (function (t) {
                        return e.setSelectedMode(t.target.value)
                    })), s.vc(8, Xi, 3, 5, "option", 5), s.Nb(), s.Nb(), s.Nb()), 2 & t && (s.wb(2), s.yc(s.bc(3, 2, "IR_AUTO_OFF.TITLE")), s.wb(6), s.ec("ngForOf", e.modes))
                },
                directives: [Nt.f, Ce.k, Ce.o],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();

        function Qi(t, e) {
            if (1 & t && (s.Mb(0), s.xc(1), s.Lb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.zc(" ", t.cameraInfo.irlevel1, " ")
            }
        }

        function $i(t, e) {
            if (1 & t && (s.Mb(0), s.xc(1), s.Lb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.zc(" ", " / " + t.cameraInfo.irlevel2, " ")
            }
        }

        function Ki(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 6), s.Ob(1, "app-motor-item", 8), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb(2).onChange(e)
                })), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("motor", t.motorDataService.getMotorByType("IRLEVEL1"))("disabled", !t.motorDataService.getMotorByType("IRLEVEL1").isManual)
            }
        }

        function ts(t, e) {
            1 & t && s.Jb(0, "mat-divider")
        }

        function es(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 6), s.Ob(1, "app-motor-item", 8), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb(2).onChange(e)
                })), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("motor", t.motorDataService.getMotorByType("IRLEVEL2"))("disabled", !t.motorDataService.getMotorByType("IRLEVEL2").isManual)
            }
        }

        function is(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.Ob(7, "mat-panel-description", 2), s.Mb(8), s.xc(9), s.ac(10, "translate"), s.ac(11, "translate"), s.Lb(), s.vc(12, Qi, 2, 1, "ng-container", 3), s.vc(13, $i, 2, 1, "ng-container", 3), s.Nb(), s.Nb(), s.Jb(14, "mat-divider"), s.Ob(15, "mat-list", 4), s.vc(16, Ki, 2, 2, "mat-list-item", 5), s.vc(17, ts, 1, 0, "mat-divider", 3), s.vc(18, es, 2, 2, "mat-list-item", 5), s.Jb(19, "mat-divider"), s.Ob(20, "mat-list-item", 6), s.Ob(21, "app-ir-auto-off", 7), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Nb(), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(5), s.yc(s.bc(6, 9, "IR_SPOTLIGHT")), s.wb(4), s.Ac(" ", s.bc(10, 11, "STATUS"), ": ", s.bc(11, 13, t.irStatus ? "IRF_STATUS_ON" : "IRF_STATUS_OFF"), " "), s.wb(3), s.ec("ngIf", t.motorDataService.getMotorByType("IRLEVEL1")), s.wb(1), s.ec("ngIf", t.motorDataService.getMotorByType("IRLEVEL2")), s.wb(3), s.ec("ngIf", t.motorDataService.getMotorByType("IRLEVEL1")), s.wb(1), s.ec("ngIf", t.motorDataService.getMotorByType("IRLEVEL2")), s.wb(1), s.ec("ngIf", t.motorDataService.getMotorByType("IRLEVEL2")), s.wb(3), s.ec("cameraInfo", t.cameraInfo)
            }
        }

        let ss = (() => {
            class t extends fe {
                get canShowComponent() {
                    return this.motorDataService.data.length > 0 && (null !== this.motorDataService.getMotorByType("IRLEVEL1") || null !== this.motorDataService.getMotorByType("IRLEVEL2"))
                }

                get irStatus() {
                    return "AUTO" === this.cameraInfo.irAutoOff && (this.cameraInfo.irlevel1 > 0 || this.cameraInfo.irlevel2 > 0)
                }
            }

            return t.\u0275fac = function (e) {
                return ns(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-group-ir"]],
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], [2, "justify-content", "flex-end"], [4, "ngIf"], ["dense", "", "role", "list"], ["role", "listitem", "class", "mat-list-item-motor", 4, "ngIf"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor", 3, "cameraInfo", "changeEmmitter"], [1, "app-motor", 3, "motor", "disabled", "changeEmmitter"]],
                template: function (t, e) {
                    1 & t && s.vc(0, is, 22, 15, "div", 0), 2 & t && s.ec("ngIf", e.canShowComponent)
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, pe.c, Se.a, ve.a, ve.b, Ji, Ze],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const ns = s.Qb(ss);

        function as(t, e) {
            if (1 & t && (s.Mb(0), s.xc(1), s.Lb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.zc(" ", (t.getMotorOdd ? "" : " / ") + t.cameraInfo["extir" + t.numberIr + "time0"], " ")
            }
        }

        function rs(t, e) {
            if (1 & t && (s.Mb(0), s.xc(1), s.Lb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.zc(" ", " / " + t.cameraInfo["extir" + t.numberIr + "time1"], " ")
            }
        }

        function os(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 6), s.Ob(1, "app-motor-item", 7), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb(2).onChange(e)
                })), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("motor", t.getMotorEven)("disabled", !t.getMotorEven.isManual)
            }
        }

        function cs(t, e) {
            1 & t && s.Jb(0, "mat-divider")
        }

        function ls(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 6), s.Ob(1, "app-motor-item", 7), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb(2).onChange(e)
                })), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("motor", t.getMotorOdd)("disabled", !t.getMotorOdd.isManual)
            }
        }

        function hs(t, e) {
            if (1 & t && (s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.Ob(7, "mat-panel-description", 2), s.xc(8), s.ac(9, "translate"), s.vc(10, as, 2, 1, "ng-container", 3), s.vc(11, rs, 2, 1, "ng-container", 3), s.Nb(), s.Nb(), s.Jb(12, "mat-divider"), s.Ob(13, "mat-list", 4), s.vc(14, os, 2, 2, "mat-list-item", 5), s.vc(15, cs, 1, 0, "mat-divider", 3), s.vc(16, ls, 2, 2, "mat-list-item", 5), s.Nb(), s.Nb(), s.Nb()), 2 & t) {
                const t = s.Zb();
                s.wb(5), s.Ac("", s.bc(6, 8, "EXT_IR"), " ", t.numberIr, ""), s.wb(3), s.zc(" ", s.bc(9, 10, "CURRENT_VALUE"), ": "), s.wb(2), s.ec("ngIf", t.getMotorEven), s.wb(1), s.ec("ngIf", t.getMotorOdd), s.wb(3), s.ec("ngIf", t.getMotorEven), s.wb(1), s.ec("ngIf", t.getMotorOdd), s.wb(1), s.ec("ngIf", t.getMotorOdd)
            }
        }

        let us = (() => {
            class t extends fe {
                get canShowComponent() {
                    return this.motorDataService.data.length > 0 && (null !== this.getMotorEven || null !== this.getMotorOdd)
                }

                getMotor(t) {
                    return this.motorDataService.data.length > 0 && this.motorDataService.getMotorByType(this.getNameMotor(t)) ? this.motorDataService.getMotorByType(this.getNameMotor(t)) : null
                }

                getNameMotor(t) {
                    return "EXTIR" + this.numberIr.toString() + "TIME" + t.toString()
                }

                get getMotorEven() {
                    return this.getMotor(0)
                }

                get getMotorOdd() {
                    return this.getMotor(1)
                }
            }

            return t.\u0275fac = function (e) {
                return ds(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-group-ext-ir"]],
                inputs: {numberIr: "numberIr"},
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], [2, "justify-content", "flex-end"], [4, "ngIf"], ["dense", "", "role", "list"], ["role", "listitem", "class", "mat-list-item-motor", 4, "ngIf"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor", 3, "motor", "disabled", "changeEmmitter"]],
                template: function (t, e) {
                    1 & t && s.vc(0, hs, 17, 12, "div", 0), 2 & t && s.ec("ngIf", e.canShowComponent)
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, pe.c, Se.a, ve.a, ve.b, Ze],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const ds = s.Qb(us), ms = ["selectElement"];

        function bs(t, e) {
            if (1 & t && (s.Ob(0, "option", 6), s.xc(1), s.Nb()), 2 & t) {
                const t = e.$implicit, i = s.Zb();
                s.ec("value", t.id)("selected", t.id === i.cameraInfo.autoGainController), s.wb(1), s.zc(" ", t.description, " ")
            }
        }

        let gs = (() => {
            class t {
                constructor(t, e) {
                    this.motorDbService = t, this.cameraSelectorService = e, this.controllers = [{
                        id: -1,
                        description: "Critical unknown",
                        selected: !1,
                        disabled: !0
                    }, {id: 0, description: "Unknown", selected: !1, disabled: !0}, {
                        id: 1,
                        description: "Disabled",
                        selected: !1,
                        disabled: !1
                    }, {id: 2, description: "msensor AGS", selected: !1, disabled: !1}, {
                        id: 3,
                        description: "sensorapp AGS",
                        selected: !1,
                        disabled: !1
                    }, {id: 4, description: "msensor AGS V3", selected: !1, disabled: !1}, {
                        id: 5,
                        description: "2 + 3",
                        selected: !1,
                        disabled: !0
                    }], this.changeEmmitter = new s.l
                }

                setSelectedControllerId(t) {
                    this.motorDbService.sendToDb("setAutoGainController", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, e => {
                        !0 === e.execLib.result ? (this.cameraInfo.autoGainController = Number(t), this.changeEmmitter.emit(t)) : this.select.nativeElement.value = this.cameraInfo.autoGainController
                    })
                }

                getUserControllers() {
                    return this.controllers.filter(t => !1 === t.disabled)
                }

                ngOnInit() {
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(v), s.Ib(S))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-autogain-controller"]],
                viewQuery: function (t, e) {
                    var i;
                    1 & t && s.tc(ms, !0), 2 & t && s.kc(i = s.Wb()) && (e.select = i.first)
                },
                inputs: {cameraInfo: "cameraInfo"},
                outputs: {changeEmmitter: "changeEmmitter"},
                decls: 9,
                vars: 4,
                consts: [[1, "flex", "flex180"], [1, "flex", "flex-wide", "align-right"], [2, "padding", "8px"], [1, "select", "flex", "flex180", "bordered", 3, "change"], ["selectElement", ""], [3, "value", "selected", 4, "ngFor", "ngForOf"], [3, "value", "selected"]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "div", 0), s.Ob(1, "h4"), s.xc(2), s.ac(3, "translate"), s.Nb(), s.Nb(), s.Ob(4, "div", 1), s.Ob(5, "div", 2), s.Ob(6, "select", 3, 4), s.Vb("change", (function (t) {
                        return e.setSelectedControllerId(t.target.value)
                    })), s.vc(8, bs, 2, 3, "option", 5), s.Nb(), s.Nb(), s.Nb()), 2 & t && (s.wb(2), s.yc(s.bc(3, 2, "AUTO_GAIN_CONTROLLER")), s.wb(6), s.ec("ngForOf", e.getUserControllers()))
                },
                directives: [Nt.f, Ce.k, Ce.o],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();

        function fs(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 1), s.Ob(1, "div", 2), s.Ob(2, "h4"), s.xc(3), s.ac(4, "translate"), s.Nb(), s.Nb(), s.Ob(5, "div", 1), s.Ob(6, "app-increment", 3), s.Vb("valueChange", (function (e) {
                    return s.oc(t), s.Zb().onValueChangeHandler(e)
                })), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(3), s.yc(s.bc(4, 12, "MAX_GAIN")), s.wb(3), s.ec("disabled", t.disabled)("showMinMax", !0)("min", t.min)("max", t.max)("value", t.currentValue)("minStep", 1)("maxStep", 1e3)("step", t.sliderStep)("showValue", !0)("showStep", !0)("showTwist", !0)
            }
        }

        let ps = (() => {
            class t {
                constructor(t, e, i) {
                    this.motorDbService = t, this.motorService = e, this.cameraSelectorService = i, this.disabled = !1, this.min = 0, this.max = 2e3, this.sliderStep = 50
                }

                onValueChangeHandler(t) {
                    this.disabled = !0, this.motorDbService.sendToDb("setMaxGain", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, e => {
                        !0 === e.execLib.result && (this.currentValue = t, this.cameraInfo.maxGain = this.currentValue), this.disabled = !1
                    })
                }

                ngOnInit() {
                    this.currentValue = this.cameraInfo.maxGain
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(v), s.Ib(k), s.Ib(S))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-maxgain"]],
                inputs: {cameraInfo: "cameraInfo"},
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], [1, "flex", "flex180"], ["fieldWidth", "70px", 3, "disabled", "showMinMax", "min", "max", "value", "minStep", "maxStep", "step", "showValue", "showStep", "showTwist", "valueChange"]],
                template: function (t, e) {
                    1 & t && s.vc(0, fs, 7, 14, "div", 0), 2 & t && s.ec("ngIf", e.cameraInfo)
                },
                directives: [Nt.g, Pe],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();

        function Ss(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 1), s.Ob(1, "div", 2), s.Ob(2, "h4"), s.xc(3), s.ac(4, "translate"), s.Nb(), s.Nb(), s.Ob(5, "div", 1), s.Ob(6, "app-increment", 3), s.Vb("valueChange", (function (e) {
                    return s.oc(t), s.Zb().onValueChangeHandler(e)
                })), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(3), s.yc(s.bc(4, 12, "GAIN")), s.wb(3), s.ec("disabled", t.disabled)("showMinMax", !0)("min", t.min)("max", t.max)("value", t.currentValue)("minStep", 1)("maxStep", 1e3)("step", t.sliderStep)("showValue", !0)("showStep", !0)("showTwist", !0)
            }
        }

        let vs = (() => {
            class t {
                constructor(t, e, i) {
                    this.motorDbService = t, this.motorService = e, this.cameraSelectorService = i, this.disabled = !1, this.min = 0, this.max = 2e3, this.sliderStep = 50
                }

                onValueChangeHandler(t) {
                    this.disabled = !0, this.motorDbService.sendToDb("setGain", null, {
                        cameraData: this.cameraSelectorService.selectedCamera,
                        value: t
                    }, e => {
                        !0 === e.execLib.result && (this.currentValue = t, this.cameraInfo.gain = this.currentValue), this.disabled = !1
                    })
                }

                ngOnInit() {
                    this.currentValue = this.cameraInfo.gain
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(v), s.Ib(k), s.Ib(S))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-gain"]],
                inputs: {cameraInfo: "cameraInfo"},
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], [1, "flex", "flex180"], ["fieldWidth", "70px", 3, "disabled", "showMinMax", "min", "max", "value", "minStep", "maxStep", "step", "showValue", "showStep", "showTwist", "valueChange"]],
                template: function (t, e) {
                    1 & t && s.vc(0, Ss, 7, 14, "div", 0), 2 & t && s.ec("ngIf", e.cameraInfo)
                },
                directives: [Nt.g, Pe],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();

        function ws(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-list-item", 6), s.Ob(1, "app-autogain-controller", 7), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb(2).onChange(e)
                })), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("cameraInfo", t.cameraInfo)
            }
        }

        function xs(t, e) {
            1 & t && s.Jb(0, "mat-divider")
        }

        function Cs(t, e) {
            if (1 & t && (s.Ob(0, "mat-list-item", 6), s.Jb(1, "app-maxgain", 8), s.Nb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("cameraInfo", t.cameraInfo)
            }
        }

        function ys(t, e) {
            if (1 & t && (s.Ob(0, "mat-list-item", 6), s.Jb(1, "app-gain", 8), s.Nb()), 2 & t) {
                const t = s.Zb(2);
                s.wb(1), s.ec("cameraInfo", t.cameraInfo)
            }
        }

        function Os(t, e) {
            if (1 & t && (s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.Ob(7, "mat-panel-description", 2), s.xc(8), s.ac(9, "translate"), s.Nb(), s.Nb(), s.Jb(10, "mat-divider"), s.Ob(11, "mat-list", 3), s.vc(12, ws, 2, 1, "mat-list-item", 4), s.vc(13, xs, 1, 0, "mat-divider", 5), s.vc(14, Cs, 2, 1, "mat-list-item", 4), s.vc(15, ys, 2, 1, "mat-list-item", 4), s.Nb(), s.Nb(), s.Nb()), 2 & t) {
                const t = s.Zb();
                s.wb(5), s.yc(s.bc(6, 7, "GAIN")), s.wb(3), s.Ac(" ", s.bc(9, 9, "CURRENT_VALUE"), ": ", t.cameraInfo.gain, " "), s.wb(4), s.ec("ngIf", t.cameraInfo.canSetAutoGainController), s.wb(1), s.ec("ngIf", t.cameraInfo.canSetAutoGainController), s.wb(1), s.ec("ngIf", 3 == t.cameraInfo.autoGainController), s.wb(1), s.ec("ngIf", 1 == t.cameraInfo.autoGainController)
            }
        }

        let Is = (() => {
            class t extends fe {
            }

            return t.\u0275fac = function (e) {
                return Es(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-group-gain"]],
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], [2, "justify-content", "flex-end"], ["dense", "", "role", "list"], ["role", "listitem", "class", "mat-list-item-motor", 4, "ngIf"], [4, "ngIf"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor", 3, "cameraInfo", "changeEmmitter"], [1, "app-motor", 3, "cameraInfo"]],
                template: function (t, e) {
                    1 & t && s.vc(0, Os, 16, 11, "div", 0), 2 & t && s.ec("ngIf", e.cameraInfo.canSetMaxGain && e.motorDataService.data.length)
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, pe.c, Se.a, ve.a, ve.b, gs, ps, vs],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const Es = s.Qb(Is);

        function Ms(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.Ob(7, "mat-panel-description", 2), s.xc(8), s.ac(9, "translate"), s.Nb(), s.Nb(), s.Ob(10, "mat-list", 3), s.Ob(11, "mat-list-item", 4), s.Ob(12, "app-motor-item", 5), s.Vb("changeEmmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Nb(), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(5), s.yc(s.bc(6, 4, "PHASE")), s.wb(3), s.Ac(" ", s.bc(9, 6, "CURRENT_VALUE"), ": ", t.motorDataService.getMotorByType("PHASE").getCurrentPosition(), " "), s.wb(4), s.ec("motor", t.motorDataService.getMotorByType("PHASE"))
            }
        }

        let Ds = (() => {
            class t extends fe {
            }

            return t.\u0275fac = function (e) {
                return Ps(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-group-photosync-phase"]],
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], [2, "justify-content", "flex-end"], ["dense", "", "role", "list"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "app-motor", 3, "motor", "changeEmmitter"]],
                template: function (t, e) {
                    1 & t && s.vc(0, Ms, 13, 8, "div", 0), 2 & t && s.ec("ngIf", null !== e.motorDataService.getMotorByType("PHASE"))
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, pe.c, ve.a, ve.b, Ze],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const Ps = s.Qb(Ds);

        function Ts(t, e) {
            if (1 & t && (s.Ob(0, "span"), s.xc(1), s.ac(2, "translate"), s.Nb()), 2 & t) {
                const t = s.Zb().$implicit;
                s.wb(1), s.Ac(" ", s.bc(2, 2, t.split(":")[0]), ": ", t.split(":")[1], " ")
            }
        }

        function Ns(t, e) {
            if (1 & t && (s.Ob(0, "div", 9), s.vc(1, Ts, 3, 4, "span", 10), s.Nb()), 2 & t) {
                const t = e.$implicit;
                s.wb(1), s.ec("ngIf", "" !== t)
            }
        }

        function _s(t, e) {
            if (1 & t && (s.Ob(0, "span"), s.xc(1), s.ac(2, "translate"), s.Nb()), 2 & t) {
                const t = s.Zb().$implicit;
                s.wb(1), s.Ac(" ", s.bc(2, 2, t.split(":")[0]), ": ", t.split(":")[1], " ")
            }
        }

        function Rs(t, e) {
            if (1 & t && (s.Ob(0, "div", 9), s.vc(1, _s, 3, 4, "span", 10), s.Nb()), 2 & t) {
                const t = e.$implicit;
                s.wb(1), s.ec("ngIf", "" !== t)
            }
        }

        function Ls(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 1), s.Ob(1, "mat-expansion-panel"), s.Ob(2, "mat-expansion-panel-header"), s.Ob(3, "mat-panel-title"), s.Ob(4, "strong"), s.xc(5), s.ac(6, "translate"), s.Nb(), s.Nb(), s.Nb(), s.Jb(7, "mat-divider"), s.Ob(8, "mat-list"), s.Ob(9, "mat-list-item", 2), s.Ob(10, "div", 3), s.Ob(11, "button", 4), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().motorDataService.saveHeightPresent("LOW")
                })), s.xc(12), s.ac(13, "translate"), s.Nb(), s.Ob(14, "button", 4), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().motorDataService.saveHeightPresent("HIGH")
                })), s.xc(15), s.ac(16, "translate"), s.Nb(), s.Nb(), s.Nb(), s.Ob(17, "mat-list-item", 2), s.Ob(18, "div", 5), s.Ob(19, "div", 6), s.Ob(20, "i"), s.xc(21), s.ac(22, "translate"), s.Nb(), s.Nb(), s.vc(23, Ns, 2, 1, "div", 7), s.Nb(), s.Ob(24, "div", 8), s.Ob(25, "div", 6), s.Ob(26, "i"), s.xc(27), s.ac(28, "translate"), s.Nb(), s.Nb(), s.vc(29, Rs, 2, 1, "div", 7), s.Nb(), s.Nb(), s.Nb(), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(5), s.yc(s.bc(6, 7, "PRESET")), s.wb(7), s.zc(" ", s.bc(13, 9, "SAVE_PRESET_LOW"), " "), s.wb(3), s.zc(" ", s.bc(16, 11, "SAVE_PRESET_HIGH"), " "), s.wb(6), s.yc(s.bc(22, 13, "SAVED_PRESET")), s.wb(2), s.ec("ngForOf", t.cameraInfo.presetLow.split("\n")), s.wb(4), s.yc(s.bc(28, 15, "SAVED_PRESET")), s.wb(2), s.ec("ngForOf", t.cameraInfo.presetHigh.split("\n"))
            }
        }

        let As = (() => {
            class t extends fe {
            }

            return t.\u0275fac = function (e) {
                return ks(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-group-preset"]],
                features: [s.tb],
                decls: 1,
                vars: 1,
                consts: [["class", "flex flex-wide", 4, "ngIf"], [1, "flex", "flex-wide"], ["role", "listitem", 1, "mat-list-item-motor"], [1, "flex", "flex-wide", "btn-group"], ["mat-stroked-button", "", "color", "primary", 1, "full-width-button", 3, "click"], [1, "motor-saved-preset", "low"], [1, "flex", "flex-wide", 2, "justify-content", "center"], ["class", "motor-preset-item", "style", "padding-left: 20px;", 4, "ngFor", "ngForOf"], [1, "motor-saved-preset"], [1, "motor-preset-item", 2, "padding-left", "20px"], [4, "ngIf"]],
                template: function (t, e) {
                    1 & t && s.vc(0, Ls, 30, 17, "div", 0), 2 & t && s.ec("ngIf", !0 === e.cameraInfo.hasPreset && e.motorDataService.data.length)
                },
                directives: [Nt.g, pe.b, pe.d, pe.e, Se.a, ve.a, ve.b, Vt.a, Nt.f],
                pipes: [A.d],
                encapsulation: 2
            }), t
        })();
        const ks = s.Qb(As);

        function Fs(t, e) {
            1 & t && s.Jb(0, "div", 4)
        }

        function Vs(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div"), s.Ob(1, "app-motor-group-lens", 5, 6), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(3, "app-motor-group-iris", 5, 7), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(5, "app-motor-group-focus", 5, 8), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(7, "app-motor-focus-by-distance", 5, 9), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(9, "app-motor-group-tilt", 5, 10), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(11, "app-motor-group-zoom", 5, 11), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(13, "app-motor-group-exposure", 5, 12), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(15, "app-motor-mode-ir", 5, 13), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(17, "app-motor-group-ir", 5, 14), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(19, "app-motor-group-ext-ir", 15, 16), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(21, "app-motor-group-ext-ir", 15, 17), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(23, "app-motor-group-ext-ir", 15, 18), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(25, "app-motor-group-ext-ir", 15, 19), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(27, "app-motor-group-gain", 5, 20), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Ob(29, "app-motor-group-photosync-phase", 5, 21), s.Vb("changeEmitter", (function (e) {
                    return s.oc(t), s.Zb().onChange(e)
                })), s.Nb(), s.Jb(31, "app-motor-group-preset", 22, 23), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(1), s.ec("cameraInfo", t.cameraInfo), s.wb(2), s.ec("cameraInfo", t.cameraInfo), s.wb(2), s.ec("cameraInfo", t.cameraInfo), s.wb(2), s.ec("cameraInfo", t.cameraInfo), s.wb(2), s.ec("cameraInfo", t.cameraInfo), s.wb(2), s.ec("cameraInfo", t.cameraInfo), s.wb(2), s.ec("cameraInfo", t.cameraInfo), s.wb(2), s.ec("cameraInfo", t.cameraInfo), s.wb(2), s.ec("cameraInfo", t.cameraInfo), s.wb(2), s.ec("cameraInfo", t.cameraInfo)("numberIr", 1), s.wb(2), s.ec("cameraInfo", t.cameraInfo)("numberIr", 2), s.wb(2), s.ec("cameraInfo", t.cameraInfo)("numberIr", 3), s.wb(2), s.ec("cameraInfo", t.cameraInfo)("numberIr", 4), s.wb(2), s.ec("cameraInfo", t.cameraInfo), s.wb(2), s.ec("cameraInfo", t.cameraInfo), s.wb(2), s.ec("cameraInfo", t.cameraInfo)
            }
        }

        let Bs = (() => {
            class t {
                constructor(t, e) {
                    this.motorDataService = t, this.motorDbService = e, this.changeEmitter = new s.l, this.dbInfoLoaded = !1, console.log("Motor list component created", t), this.motorDbService.cameraInfo.subscribe(t => {
                        this.cameraInfo = t, this.dbInfoLoaded = !0
                    })
                }

                get totallyLoaded() {
                    return this.dbInfoLoaded && this.motorDataService.canShowComponent()
                }

                onChange(t) {
                    this.changeEmitter.emit(t)
                }

                get progressBarMode() {
                    return !this.motorDataService.canShowComponent() || this.motorDbService.isLoading || this.motorDataService.anyMotorIsBusy() ? "indeterminate" : "none"
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(k), s.Ib(v))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-motor-list"]],
                outputs: {changeEmitter: "changeEmitter"},
                decls: 4,
                vars: 3,
                consts: [[3, "mode"], [2, "position", "relative", "width", "100%"], ["class", "overlay", 4, "ngIf"], [4, "ngIf"], [1, "overlay"], [1, "motor-group", 3, "cameraInfo", "changeEmitter"], ["lens", ""], ["iris", ""], ["focus", ""], ["focusByDistance", ""], ["tilt", ""], ["zoom", ""], ["exposure", ""], ["modeIr", ""], ["ir", ""], [1, "motor-group", 3, "cameraInfo", "numberIr", "changeEmitter"], ["extir1", ""], ["extir2", ""], ["extir3", ""], ["extir4", ""], ["gain", ""], ["photosyncphase", ""], [1, "motor-group", 3, "cameraInfo"], ["preset", ""]],
                template: function (t, e) {
                    1 & t && (s.Jb(0, "mat-progress-bar", 0), s.Ob(1, "div", 1), s.vc(2, Fs, 1, 0, "div", 2), s.vc(3, Vs, 33, 20, "div", 3), s.Nb()), 2 & t && (s.ec("mode", e.progressBarMode), s.wb(2), s.ec("ngIf", "none" !== e.progressBarMode), s.wb(1), s.ec("ngIf", e.totallyLoaded))
                },
                directives: [ge.a, Nt.g, Ae, je, Qe, ti, si, Di, Li, Gi, ss, us, Is, Ds, As],
                encapsulation: 2
            }), t
        })();

        function Zs(t, e) {
            if (1 & t && (s.Ob(0, "span"), s.xc(1), s.Nb()), 2 & t) {
                const t = s.Zb().$implicit;
                s.wb(1), s.Ac(" [", t.serial, "] ", t.description, " ")
            }
        }

        function zs(t, e) {
            if (1 & t && (s.Ob(0, "span", 7), s.xc(1), s.Nb()), 2 & t) {
                const t = s.Zb().$implicit;
                s.wb(1), s.zc(" ", t.userName, " ")
            }
        }

        function Us(t, e) {
            if (1 & t && (s.Ob(0, "mat-option", 4), s.vc(1, Zs, 2, 2, "span", 5), s.vc(2, zs, 2, 1, "span", 6), s.Nb()), 2 & t) {
                const t = e.$implicit;
                s.ec("value", t)("disabled", !t.connected), s.wb(1), s.ec("ngIf", !t.userName), s.wb(1), s.ec("ngIf", t.userName)
            }
        }

        function Hs(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "mat-form-field", 1), s.Ob(1, "mat-select", 2), s.Vb("valueChange", (function (e) {
                    return s.oc(t), s.Zb().cameraSelectorService.selectedCamera = e
                })), s.ac(2, "translate"), s.vc(3, Us, 3, 4, "mat-option", 3), s.Nb(), s.Nb()
            }
            if (2 & t) {
                const t = s.Zb();
                s.wb(1), s.fc("placeholder", s.bc(2, 3, "CAMERA_SELECTOR.CHOOSE_CAMERA")), s.ec("value", t.cameraSelectorService.selectedCamera), s.wb(2), s.ec("ngForOf", t.data)
            }
        }

        let js = (() => {
            class t {
                constructor(t, e) {
                    this.cameraSelectorService = t, this.translateService = e, this.data = [], this.filterType = "ANY"
                }

                ngOnInit() {
                    this.cameraSelectorService.cameraList.pipe(Object(m.a)(1)).subscribe(t => {
                        this.data = t.filter(t => t.type === this.filterType || "ANY" === this.filterType).map(t => ({
                            ...t,
                            userName: this.modifyUserName(t.userName)
                        }));
                        const e = this.data.find(t => JSON.stringify(t) === localStorage.getItem("cameraSelector.selectedCamera") && t.connected);
                        this.cameraSelectorService.selectedCamera = e || this.data[0] || null
                    })
                }

                modifyUserName(t) {
                    if (!t) return "";
                    if (t.includes("camera_name_")) {
                        const e = this.translateService.instant(`CAMERA_SELECTOR.${t}`);
                        return e === `CAMERA_SELECTOR.${t}` ? t : e
                    }
                    return t
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(S), s.Ib(A.e))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-camera-selector"]],
                inputs: {filterType: "filterType"},
                decls: 1,
                vars: 1,
                consts: [["style", "width: 100%;", 4, "ngIf"], [2, "width", "100%"], ["name", "item", 3, "placeholder", "value", "valueChange"], [3, "value", "disabled", 4, "ngFor", "ngForOf"], [3, "value", "disabled"], [4, "ngIf"], ["class", "camera-info", 4, "ngIf"], [1, "camera-info"]],
                template: function (t, e) {
                    1 & t && s.vc(0, Hs, 4, 5, "mat-form-field", 0), 2 & t && s.ec("ngIf", e.data.length > 1)
                },
                directives: [Nt.g, we.b, Fi.a, Nt.f, Vi.o],
                pipes: [A.d],
                styles: [""]
            }), t
        })();
        var Ws = i("ifGi");
        const Gs = ["container"], Ys = ["overlay"];
        let qs = (() => {
            class t {
                constructor(e, i) {
                    this.rulerService = e, this.barcodereaderService = i, this.crossx1 = 0, this.crossy1 = 0, this.crossx2 = 0, this.crossy2 = 0, this.elId = "appruller" + t.counter++, this.rulerChanged = new s.l
                }

                set size(t) {
                    if (t && t.width && t.height) {
                        this.stage && (this.stage.width(t.width), this.stage.height(t.height));
                        const e = this.container.nativeElement;
                        if (e.style.width = t.width + "px", e.style.height = t.height + "px", this.canvasSize && (this.canvasSize.width !== t.width || this.canvasSize.height !== t.height) && this.stage) {
                            const e = this.getLinePoints();
                            e[0] = e[0] * t.width / this.canvasSize.width, e[2] = e[2] * t.width / this.canvasSize.width, e[1] = e[1] * t.height / this.canvasSize.height, e[3] = e[3] * t.height / this.canvasSize.height, this.cross1.x(e[0]), this.cross1.y(e[1]), this.cross2.x(e[2]), this.cross2.y(e[3]), this.line.points(e), this.layer.draw()
                        }
                        this.canvasSize = t
                    }
                }

                set position(t) {
                    this.crossx1 = t.x1, this.crossx2 = t.x2, this.crossy1 = t.y1, this.crossy2 = t.y2, this.cross1 && this.cross2 && (this.cross1.x(this.crossx1), this.cross2.x(this.crossx2), this.cross1.y(this.crossy1), this.cross2.y(this.crossy2), this.updateLinePosition())
                }

                initStage() {
                    this.stage || this.canvasSize && (this.container.nativeElement.id = this.elId, this.stage = new Ws.Stage({container: this.elId, ...this.canvasSize}), this.layer = new Ws.Layer({}), this.stage.add(this.layer), this.line = new Ws.Line({
                        points: [],
                        closed: !1,
                        stroke: "#D1EFF2",
                        opacity: .4
                    }), this.cross1 = this.createCross(), this.cross2 = this.createCross(), this.cross1.x(this.crossx1 || 50), this.cross1.y(this.crossy1 || 100), this.cross2.x(this.crossx2 || 100), this.cross2.y(this.crossy2 || 100), this.updateLinePosition(), this.layer.add(this.line), this.layer.add(this.cross1), this.layer.add(this.cross2), this.layer.draw())
                }

                createCross(t = 50) {
                    const e = new Ws.Group({draggable: !0}),
                        i = new Ws.Line({points: [0, -t, 0, t], closed: !1, stroke: "#00FF00", opacity: .3}),
                        s = new Ws.Line({points: [-t, 0, t, 0], closed: !1, stroke: "#00FF00", opacity: .3}),
                        n = new Ws.Circle({radius: t, fill: "#FFFFFF", opacity: 0});
                    return e.on("mouseover touchstart", () => document.body.style.cursor = "pointer"), e.on("mouseout touchend", () => document.body.style.cursor = "default"), e.on("dragstart", t => {
                        t.evt.stopPropagation(), t.evt.stopImmediatePropagation(), t.evt.cancelBubble = !0, t.evt.stopDraggingParent = !0
                    }), e.on("click touch mousedown", t => {
                        t.evt.stopPropagation(), t.evt.stopImmediatePropagation(), t.evt.stopDraggingParent = !0
                    }), e.on("dragmove", t => {
                        this.updateLinePosition(), t.evt.preventDefault(), t.evt.stopPropagation(), t.evt.stopImmediatePropagation(), t.evt.cancelBubble = !0, t.evt.stopDraggingParent = !0
                    }), e.add(i), e.add(s), e.add(n), e
                }

                updateLinePosition() {
                    if (this.line) {
                        const t = this.getLinePoints();
                        this.line.points(t), this.rulerService.onRulerChange([t[0] / this.canvasSize.width, t[1] / this.canvasSize.height, t[2] / this.canvasSize.width, t[3] / this.canvasSize.height]), this.rulerChanged.emit(t)
                    }
                }

                getLinePoints() {
                    return [this.cross1.x(), this.cross1.y(), this.cross2.x(), this.cross2.y()]
                }

                ngDoCheck() {
                    const t = this.overlay;
                    if (t) {
                        const e = t.nativeElement;
                        e && e.clientHeight && e.clientWidth && (this.canvasSize && e.clientWidth === this.canvasSize.width && e.clientHeight === this.canvasSize.height || (this.size = {
                            width: e.clientWidth,
                            height: e.clientHeight
                        }, this.initStage()))
                    }
                }

                ngOnInit() {
                    this.subscriptions = [this.barcodereaderService.position.subscribe(t => {
                        const {width: e, height: i} = this.canvasSize;
                        this.position = {x1: t.x1 * e, y1: t.y1 * i, x2: t.x2 * e, y2: t.y2 * i}
                    })]
                }

                ngOnDestroy() {
                    this.subscriptions.forEach(t => t.unsubscribe())
                }
            }

            return t.counter = 0, t.\u0275fac = function (e) {
                return new (e || t)(s.Ib($), s.Ib(Mt))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-ruler"]],
                viewQuery: function (t, e) {
                    var i;
                    1 & t && (s.Cc(Gs, !0), s.Cc(Ys, !0)), 2 & t && (s.kc(i = s.Wb()) && (e.container = i.first), s.kc(i = s.Wb()) && (e.overlay = i.first))
                },
                inputs: {size: "size", position: "position"},
                outputs: {rulerChanged: "rulerChanged"},
                decls: 4,
                vars: 0,
                consts: [[2, "width", "100%", "height", "100%", "position", "absolute"], ["overlay", ""], ["container", ""]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "div", 0, 1), s.Jb(2, "div", null, 2), s.Nb())
                },
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();
        var Xs = function (t) {
            return t.GetCameraList = "[CameraSelector] Get Camera List", t.GetCameraListSuccess = "[CameraSelector] Get Camera List Success", t.GetCameraListSnapshots = "[CameraSelector] Get Camera List Snapshots", t.GetCameraListSnapshotsSuccess = "[CameraSelector] Get Camera List Snapshots Success", t
        }({});

        class Js {
            constructor() {
                this.type = Xs.GetCameraListSnapshots
            }
        }

        const Qs = ["matSelect"];

        function $s(t, e) {
            if (1 & t && (s.Ob(0, "div", 6), s.xc(1), s.Nb()), 2 & t) {
                const t = s.Zb().$implicit;
                s.wb(1), s.Ac(" ", t.instance + 1, " [", t.serial, "] ")
            }
        }

        function Ks(t, e) {
            if (1 & t && (s.Ob(0, "div", 6), s.xc(1), s.Nb()), 2 & t) {
                const t = s.Zb().$implicit;
                s.wb(1), s.zc(" ", t.userName, " ")
            }
        }

        function tn(t, e) {
            1 & t && (s.Ob(0, "div", 7), s.xc(1), s.ac(2, "translate"), s.Nb()), 2 & t && (s.wb(1), s.zc(" ", s.bc(2, 1, "CAMERA_SELECTOR.NO_SIGNAL"), " "))
        }

        const en = function () {
            return [296]
        };

        function sn(t, e) {
            if (1 & t && s.Jb(0, "img", 8), 2 & t) {
                const t = s.Zb().$implicit, e = s.Zb();
                s.uc("width", s.hc(3, en), "px"), s.gc("src", "data:image/jpeg;base64,", e.cameraListSnapshots[t.instance], "", s.qc)
            }
        }

        function nn(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "div", 2), s.Vb("click", (function () {
                    s.oc(t);
                    const i = e.$implicit;
                    return s.Zb().changeCamera(i)
                })), s.vc(1, $s, 2, 2, "div", 3), s.vc(2, Ks, 2, 1, "div", 3), s.vc(3, tn, 3, 3, "div", 4), s.vc(4, sn, 1, 4, "img", 5), s.Nb()
            }
            if (2 & t) {
                const t = e.$implicit, i = s.Zb();
                s.wb(1), s.ec("ngIf", !t.userName), s.wb(1), s.ec("ngIf", t.userName), s.wb(1), s.ec("ngIf", !t.connected || !i.cameraListSnapshots[t.instance]), s.wb(1), s.ec("ngIf", i.cameraListSnapshots[t.instance])
            }
        }

        function an(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "button", 1), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().openCameraSelector()
                })), s.Ob(1, "mat-icon"), s.xc(2, "switch_video"), s.Nb(), s.Nb()
            }
        }

        let rn = (() => {
            class t {
                constructor(t, e, i, s, n) {
                    this.store = t, this.cameraSelectorService = e, this.dialogRef = i, this.translateService = s, this.cdr = n, this.data = [], this.filterType = "ANY", this.cameraList = [], this.cameraListSnapshots = new Map
                }

                ngOnInit() {
                    this.store.dispatch(new Js), this.cameraList$ = this.store.pipe(Object(Tt.c)(Object(Tt.b)("cameraSelectorFeature")), Object(Tt.c)(Object(Tt.b)("cameraSelector")), Object(g.a)(t => t.cameraList)), this.cameraListS = this.cameraList$.subscribe(t => {
                        this.cameraList = [...t].map(t => ({
                            ...t,
                            userName: this.modifyUserName(t.userName)
                        })), this.cdr.detectChanges()
                    }), this.cameraListSnapshots$ = this.store.pipe(Object(Tt.c)(Object(Tt.b)("cameraSelectorFeature")), Object(Tt.c)(Object(Tt.b)("cameraSelector")), Object(g.a)(t => t.cameraListSnapshots)), this.cameraListSnapshotsS = this.cameraListSnapshots$.subscribe(t => {
                        this.cameraListSnapshots = t, this.cdr.detectChanges()
                    })
                }

                ngOnDestroy() {
                    this.cameraListSnapshotsS.unsubscribe(), this.cameraListS.unsubscribe()
                }

                modifyUserName(t) {
                    if (!t) return "";
                    if (t.includes("camera_name_")) {
                        const e = this.translateService.instant(`CAMERA_SELECTOR.${t}`);
                        return e === `CAMERA_SELECTOR.${t}` ? t : e
                    }
                    return t
                }

                onNoClick() {
                    this.dialogRef.close()
                }

                changeCamera(t) {
                    this.dialogRef.close(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(Tt.a), s.Ib(S), s.Ib(Lt.f), s.Ib(A.e), s.Ib(s.f))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-camera-selector-modern"]],
                viewQuery: function (t, e) {
                    var i;
                    1 & t && s.tc(Qs, !0), 2 & t && s.kc(i = s.Wb()) && (e.matSelect = i.first)
                },
                inputs: {filterType: "filterType"},
                decls: 2,
                vars: 1,
                consts: [[1, "camera-wrapper"], ["class", "camera", 3, "click", 4, "ngFor", "ngForOf"], [1, "camera", 3, "click"], ["class", "camera-info", 4, "ngIf"], ["class", "camera-error", 4, "ngIf"], [3, "width", "src", 4, "ngIf"], [1, "camera-info"], [1, "camera-error"], [3, "src"]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "mat-dialog-content", 0), s.vc(1, nn, 5, 4, "div", 1), s.Nb()), 2 & t && (s.wb(1), s.ec("ngForOf", e.cameraList))
                },
                directives: [Lt.d, Nt.f, Nt.g],
                pipes: [A.d],
                styles: [".camera-selector-button[_ngcontent-%COMP%]{position:absolute;top:20px;right:20px;z-index:100;padding-bottom:3px;background-color:#3f51b5;color:#fff}.camera-selector-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:30px;width:30px;height:30px}.camera-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between;flex-wrap:wrap}.camera[_ngcontent-%COMP%]{position:relative;width:296px;height:166px;background-color:#708090}.camera-info[_ngcontent-%COMP%]{top:5px;left:5px;background-color:#303f9f}.camera-error[_ngcontent-%COMP%], .camera-info[_ngcontent-%COMP%]{position:absolute;color:#fff;padding:5px;border-radius:5px}.camera-error[_ngcontent-%COMP%]{top:50%;left:50%;transform:translateX(-50%) translateY(-50%);background-color:#ff4081}"],
                changeDetection: 0
            }), t
        })(), on = (() => {
            class t {
                constructor(t, e) {
                    this.dialog = t, this.cameraSelectorService = e, this.cameraSelectorService.init()
                }

                openCameraSelector() {
                    this.dialog.open(rn, {width: "640px"}).afterClosed().subscribe(t => {
                        t && (this.cameraSelectorService.selectedCamera = t)
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(Lt.b), s.Ib(S))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-camera-selector-button"]],
                decls: 1,
                vars: 1,
                consts: [["mat-raised-button", "", "class", "camera-selector-button", 3, "click", 4, "ngIf"], ["mat-raised-button", "", 1, "camera-selector-button", 3, "click"]],
                template: function (t, e) {
                    1 & t && s.vc(0, an, 3, 0, "button", 0), 2 & t && s.ec("ngIf", e.cameraSelectorService.data.length > 1)
                },
                directives: [Nt.g, Vt.a, Bt.a],
                styles: [".camera-selector-button[_ngcontent-%COMP%]{position:absolute;top:20px;right:20px;z-index:100;padding-bottom:3px;background-color:#3f51b5;color:#fff}.camera-selector-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:30px;width:30px;height:30px}.camera-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between;flex-wrap:wrap}.camera[_ngcontent-%COMP%]{position:relative;width:296px;height:166px;background-color:#708090}.camera-info[_ngcontent-%COMP%]{top:5px;left:5px;background-color:#303f9f}.camera-error[_ngcontent-%COMP%], .camera-info[_ngcontent-%COMP%]{position:absolute;color:#fff;padding:5px;border-radius:5px}.camera-error[_ngcontent-%COMP%]{top:50%;left:50%;transform:translateX(-50%) translateY(-50%);background-color:#ff4081}"]
            }), t
        })();
        var cn = i("uugP");
        const ln = ["dragContainer"], hn = ["appVideoPlayer"];
        let un = (() => {
            class t {
                constructor() {
                    this.settingsPrefix = "videoplayer.draggable-videoplayer", this.x = null, this.y = null
                }

                ngAfterViewInit() {
                    null === this.x && (this.x = parseFloat(`${this.getStorageItem("container-position.x", "10")}`)), null === this.y && (this.y = parseFloat(`${this.getStorageItem("container-position.y", "10")}`)), this.dragContainer.nativeElement.style.left = `${this.getStorageItem("container-position.x", "10")}px`, this.dragContainer.nativeElement.style.top = `${this.getStorageItem("container-position.y", "10")}px`
                }

                dragEnded(t) {
                    this.x += t.distance.x, this.y += t.distance.y, this.setStorageItem("container-position.x", this.x.toString()), this.setStorageItem("container-position.y", this.y.toString())
                }

                getStorageItem(t, e = "") {
                    return localStorage.getItem(`${this.settingsPrefix}.${t}`) || e
                }

                setStorageItem(t, e) {
                    localStorage.setItem(`${this.settingsPrefix}.${t}`, e)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-draggable-videoplayer"]],
                viewQuery: function (t, e) {
                    var i;
                    1 & t && (s.tc(ln, !0), s.tc(hn, !0)), 2 & t && (s.kc(i = s.Wb()) && (e.dragContainer = i.first), s.kc(i = s.Wb()) && (e.appVideoPlayer = i.first))
                },
                features: [s.vb([Q, Dt, Mt, $])],
                decls: 4,
                vars: 3,
                consts: [["cdkDrag", "", 1, "drag-container", 3, "cdkDragEnded"], ["dragContainer", ""], [3, "showSnapshotSettings", "useRectangleService", "settingsPrefix"], ["appVideoPlayer", ""]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "div", 0, 1), s.Vb("cdkDragEnded", (function (t) {
                        return e.dragEnded(t)
                    })), s.Jb(2, "app-video-player", 2, 3), s.Nb()), 2 & t && (s.wb(2), s.ec("showSnapshotSettings", !0)("useRectangleService", !0)("settingsPrefix", "draggable-videoplayer"))
                },
                directives: [cn.a, be],
                styles: [".drag-container[_ngcontent-%COMP%]{position:absolute;background-color:#ccc;width:300px;z-index:9;left:0;top:0}"]
            }), t
        })();
        const dn = ["videoplayer"], mn = ["draggableVideoplayer"];

        function bn(t, e) {
            1 & t && s.Jb(0, "app-camera-selector")
        }

        function gn(t, e) {
            1 & t && s.Jb(0, "app-ruler", 9)
        }

        function fn(t, e) {
            1 & t && s.Jb(0, "app-camera-selector-button", 10)
        }

        function pn(t, e) {
            1 & t && s.Jb(0, "app-draggable-videoplayer", null, 11)
        }

        let Sn = (() => {
            class t {
                constructor(t, e, i, s, n, a, r) {
                    this.motorDbService = t, this.motordata = e, this.calibrateService = i, this.barcodeService = s, this.cameraSelectorService = n, this.showDraggableVideoplayer = !1, this.isEmbedded = a.isEmbedded, this.useStore = !!r
                }

                changeHandler() {
                    this.videoplayer.showZoomComponents ? this.draggableVideoplayer.appVideoPlayer.playAndStop(5) : this.videoplayer.playAndStop(5)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(v), s.Ib(k), s.Ib(K), s.Ib(Mt), s.Ib(S), s.Ib(Pt), s.Ib(Tt.a, 8))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-root"]],
                viewQuery: function (t, e) {
                    var i;
                    1 & t && (s.tc(dn, !0), s.Cc(mn, !0)), 2 & t && (s.kc(i = s.Wb()) && (e.videoplayer = i.first), s.kc(i = s.Wb()) && (e.draggableVideoplayer = i.first))
                },
                features: [s.vb([Mt, Q, Dt, $, K, Mt, k, v])],
                decls: 11,
                vars: 13,
                consts: [[1, "main-container"], ["content", ""], [3, "ngClass"], [4, "ngIf"], [3, "showCarPlanks", "showFullscreen", "showRecognitionButton", "showSnapshotSettings", "showZoomButton", "showStretchButton", "draggablePlayerHiddenChanged"], ["videoplayer", ""], ["videoplayer-overlay", "", 4, "ngIf"], ["videoplayer-camera-selector", "", 4, "ngIf"], ["app-motor-list", "", 3, "changeEmitter"], ["videoplayer-overlay", ""], ["videoplayer-camera-selector", ""], ["draggableVideoplayer", ""]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "div", 0, 1), s.Ob(2, "div", 2), s.vc(3, bn, 1, 0, "app-camera-selector", 3), s.Ob(4, "app-video-player", 4, 5), s.Vb("draggablePlayerHiddenChanged", (function (t) {
                        return e.showDraggableVideoplayer = t
                    })), s.vc(6, gn, 1, 0, "app-ruler", 6), s.ac(7, "async"), s.vc(8, fn, 1, 0, "app-camera-selector-button", 7), s.Nb(), s.Nb(), s.Ob(9, "app-motor-list", 8), s.Vb("changeEmitter", (function () {
                        return e.changeHandler()
                    })), s.Nb(), s.Nb(), s.vc(10, pn, 2, 0, "app-draggable-videoplayer", 3)), 2 & t && (s.wb(2), s.ec("ngClass", e.isEmbedded ? "app-video-embedded" : "app-video"), s.wb(1), s.ec("ngIf", !e.useStore), s.wb(1), s.ec("showCarPlanks", !0)("showFullscreen", !0)("showRecognitionButton", !1)("showSnapshotSettings", !0)("showZoomButton", !0)("showStretchButton", !0), s.wb(2), s.ec("ngIf", !e.showDraggableVideoplayer && s.bc(7, 11, e.calibrateService.inCalibrateMode)), s.wb(2), s.ec("ngIf", e.useStore), s.wb(2), s.ec("ngIf", e.showDraggableVideoplayer))
                },
                directives: [Nt.e, Nt.g, be, Bs, js, qs, Xt, on, un],
                pipes: [Nt.a],
                styles: [".flex[_ngcontent-%COMP%]{display:flex}.flex.wide[_ngcontent-%COMP%]{flex:1}.flex.column[_ngcontent-%COMP%]{flex-direction:column}.flex.middle[_ngcontent-%COMP%]{align-items:center}.flex.top[_ngcontent-%COMP%]{align-items:flex-start}.flex.bottom[_ngcontent-%COMP%]{align-items:flex-end}.flex.center[_ngcontent-%COMP%]{justify-content:center}.flex.left[_ngcontent-%COMP%]{justify-content:flex-start}.flex.right[_ngcontent-%COMP%]{justify-content:flex-end}.flex.wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.flex.space-between[_ngcontent-%COMP%]{justify-content:space-between}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.main-container[_ngcontent-%COMP%]{display:flex;flex:1;width:100%;height:100%;flex-direction:column}.app-video[_ngcontent-%COMP%]{width:100%;margin:0 auto}.app-video-embedded[_ngcontent-%COMP%]{max-width:800px}@media screen and (orientation:portrait){.app-video[_ngcontent-%COMP%]{width:100%}}@media screen and (orientation:landscape){.app-video[_ngcontent-%COMP%]{max-width:650px}}"]
            }), t
        })();
        var vn = i("tCLk"), wn = (i("QFtD"), i("59BC")), xn = i("PxQI");

        class Cn extends A.b {
            constructor(t, e) {
                super(), this.httpLoaderFactory = e, this.loaders = {}, this.modules = [], this.addModules(t)
            }

            addModules(t) {
                t && t.length && t.forEach(t => {
                    this.addModule(t)
                })
            }

            addModule(t) {
                "" !== t && this.modules.push(t)
            }

            getTranslation(t) {
                return Object(wn.a)(this.getLoaders(t)).pipe(Object(g.a)(t => t.reduce((t, e) => ({...t, ...e}), {})))
            }

            getLoaders(t) {
                const e = this.loaders[t] || {};
                this.loaders[t] = e;
                for (let i = 0; i < this.modules.length; i++) {
                    const s = this.modules[i];
                    if (void 0 === e[s]) {
                        const i = this.httpLoaderFactory(s);
                        e[s] = i.getTranslation(t).pipe(Object(xn.a)(1))
                    }
                }
                return Object.values(e)
            }
        }

        var yn = i("mxoY"), On = i("jV/k"), In = i("oECA");

        class En extends yn.a {
            constructor(t, e, i, s) {
                super(e, i, s), this.defaultLang = t
            }

            getTranslation(t) {
                const e = [];
                return super.getTranslation(t).pipe(Object(In.a)(() => {
                    console.log(`Translate not found for ${this.prefix} lang ${t}`);
                    const i = this.getLangOnError(t, e);
                    return null !== i ? this.getTranslation(i) : Object(On.a)({})
                }))
            }

            getLangOnError(t, e) {
                let i = null;
                return "english" !== t && "russian" !== t && (i = "ru" === this.defaultLang ? "russian" : "english"), "english" === t && (i = "russian"), "russian" === t && (i = "english"), !0 === e.includes(i) ? (e.push(i), i) : null
            }
        }

        const Mn = {
            ru: "russian",
            en: "english",
            de: "deutch",
            fr: "french",
            es: "spanish",
            it: "italian",
            pl: "polish",
            uk: "ukrainian",
            ro: "romanian",
            nl: "dutch",
            el: "greek",
            hu: "hungarian",
            bg: "bulgarian",
            cs: "czech",
            be: "belarusian",
            sv: "swedish",
            da: "danish",
            he: "hebrew",
            fi: "finnish",
            sk: "slovak",
            hr: "croatian",
            no: "norwegian",
            lt: "lithuanian",
            lv: "latvian",
            tr: "turkish",
            uz: "uzbek",
            kk: "kazakh",
            tk: "turkmen",
            hy: "armenian",
            az: "azerbaijani",
            ko: "korean"
        };

        class Dn {
            static GetDefaultLanguage() {
                let t = document.locale;
                if (void 0 === t) {
                    const e = Dn.GetBrowserLang();
                    t = Dn.GetLanguageNameFromIso(e), void 0 === t && (t = e)
                }
                return t
            }

            static GetLanguageNameFromIso(t) {
                return Mn[t]
            }

            static GetBrowserLang() {
                if ("undefined" == typeof window || void 0 === window.navigator) return;
                let t = window.navigator.languages ? window.navigator.languages[0] : null;
                return t = t || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage, void 0 !== t ? (-1 !== t.indexOf("-") && (t = t.split("-")[0]), -1 !== t.indexOf("_") && (t = t.split("_")[0]), t) : void 0
            }
        }

        const Pn = t => (e, i) => new En(Dn.GetDefaultLanguage(), t, e, i);
        var Tn = i("e6ST");
        let Nn = (() => {
            class t {
                constructor(t) {
                    this.translateLoader = t, this.hasBasicLoadedLang = !1
                }

                handle(t) {
                    const e = t.translateService, i = e.currentLang || e.defaultLang;
                    return "russian" === i || "english" === i || this.hasBasicLoadedLang ? t.key : this.getLangDownloader(e, i).pipe(Object(g.a)(() => e.instant(t.key, t.interpolateParams) || t.key), Object(In.a)(() => t.key))
                }

                getLangDownloader(t, e) {
                    return this.langDownloader || (this.langDownloader = this.translateLoader.getTranslation("english").pipe(Object(G.a)(() => this.hasBasicLoadedLang = !0), Object(g.a)(i => {
                        const s = function t(e, ...i) {
                            if (!i.length) return e;
                            const s = i.shift();
                            if (_n(e) && _n(s)) for (const n in s) _n(s[n]) ? (e[n] || Object.assign(e, {[n]: {}}), t(e[n], s[n])) : Object.assign(e, {[n]: s[n]});
                            return t(e, ...i)
                        }(i, t.translations[e]);
                        t.setTranslation(e, s, !1)
                    }), Object(In.a)(t => (this.hasBasicLoadedLang = !0, Object(Tn.a)(t))), Object(f.a)(1), Object(p.a)()))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(A.b))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })();

        function _n(t) {
            return t && "object" == typeof t && !Array.isArray(t)
        }

        let Rn = (() => {
            class t {
                constructor() {
                }

                static forRoot(e) {
                    return {
                        ngModule: t,
                        providers: [t.GetLangProviderForPath("lang/app", e), Dn, {
                            provide: "i18n_inject_http_for_multi_loader",
                            deps: [r.b],
                            useFactory: Pn
                        }]
                    }
                }

                static forRootOnlyChildLang() {
                    return {
                        ngModule: t,
                        providers: [Dn, {provide: "i18n_inject_http_for_multi_loader", deps: [r.b], useFactory: Pn}]
                    }
                }

                static forChild(e, i = "lang/app") {
                    return {ngModule: t, providers: [t.GetLangProviderForPath(i, e)]}
                }

                static GetLoaderConfig() {
                    return {
                        loader: {
                            provide: A.b,
                            deps: ["i18n_inject_config_token", "i18n_inject_http_for_multi_loader"],
                            useFactory: (t, e) => new Cn(t, e)
                        },
                        defaultLanguage: Dn.GetDefaultLanguage(),
                        useDefaultLang: !0,
                        missingTranslationHandler: {provide: A.a, useClass: Nn}
                    }
                }

                static GetLangProviderForPath(...t) {
                    return {
                        provide: "i18n_inject_config_token",
                        useValue: `./${t.filter(t => "" !== t).join("/")}/`,
                        multi: !0
                    }
                }
            }

            return t.\u0275mod = s.Gb({type: t}), t.\u0275inj = s.Fb({
                factory: function (e) {
                    return new (e || t)
                }, providers: [], imports: [[c.a, A.c.forRoot(t.GetLoaderConfig())], A.c]
            }), t
        })();
        var Ln = i("4YvU"), An = i("Veia"), kn = i("Uwrd"), Fn = i("RK+r"), Vn = i("fKf5"), Bn = i("WqJl"),
            Zn = i("vv9m"), zn = i("Hw5D"), Un = i("TYSv"), Hn = i("N9e7"), jn = i("+mPs"), Wn = i("sUjR");
        let Gn = (() => {
            class t extends Wn.a {
                constructor(t) {
                    super(), this.translate = t, this.subscriptions = [], this.getRangeLabel = (t, e, i) => {
                        const s = this.translate.instant("OF_LABEL");
                        if (0 === i || 0 === e) return `0 ${s} ${i}`;
                        const n = t * e;
                        return `${n + 1} - ${n < (i = Math.max(i, 0)) ? Math.min(n + e, i) : n + e} ${s} ${i}`
                    }, this.getAndInitTranslations()
                }

                getAndInitTranslations() {
                    this.subscriptions = [this.translate.get(["ITEMS_PER_PAGE", "NEXT_PAGE", "PREVIOUS_PAGE", "OF_LABEL", "FIRST_PAGE", "LAST_PAGE"]).subscribe(t => {
                        this.itemsPerPageLabel = t.ITEMS_PER_PAGE, this.nextPageLabel = t.NEXT_PAGE, this.previousPageLabel = t.PREVIOUS_PAGE, this.firstPageLabel = t.FIRST_PAGE, this.lastPageLabel = t.LAST_PAGE, this.changes.next()
                    })]
                }

                ngOnDestroy() {
                    this.subscriptions.forEach(t => t.unsubscribe())
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(A.e))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })(), Yn = (() => {
            class t {
            }

            return t.\u0275mod = s.Gb({type: t}), t.\u0275inj = s.Fb({
                factory: function (e) {
                    return new (e || t)
                }, providers: [{provide: Wn.a, useClass: Gn}], imports: [[Rn.forChild("paginator-i18n")], Wn.b]
            }), t
        })(), qn = (() => {
            class t {
            }

            return t.\u0275mod = s.Gb({type: t}), t.\u0275inj = s.Fb({
                factory: function (e) {
                    return new (e || t)
                },
                providers: [{provide: Vi.f, useValue: document.locale_id || "ru"}, Ln.a],
                imports: [[Nt.b], vn.b, Vt.b, ki.b, we.d, Bt.b, xe.c, Se.b, ri.l, ai.c, ge.b, oi.b, Fi.b, Ln.a, Vi.m, Lt.e, pe.a, Fe.b, Ce.d, cn.c, Fn.a, kn.a, An.a, ve.c, Bn.a, zn.c, Zn.b, Un.a, Hn.a, Vn.a, Ce.m, ye.b, Ce.m, Zt.b, jn.a, Yn]
            }), t
        })(), Xn = (() => {
            class t {
            }

            return t.\u0275mod = s.Gb({type: t}), t.\u0275inj = s.Fb({
                factory: function (e) {
                    return new (e || t)
                }, providers: [S], imports: [[Rn.forChild("camera-selector"), Nt.b, vn.b, Fi.b, Vi.p, qn]]
            }), t
        })(), Jn = (() => {
            class t {
                constructor() {
                    this.matrix = []
                }

                setMatrix(t) {
                    return this.matrix = t, this
                }

                map(t, e) {
                    const i = t * this.matrix[2] + e * this.matrix[5] + this.matrix[8];
                    return {
                        x: (t * this.matrix[0] + e * this.matrix[3] + this.matrix[6]) / i,
                        y: (t * this.matrix[1] + e * this.matrix[4] + this.matrix[7]) / i
                    }
                }

                inv(t = null, e = null) {
                    const i = this.detrm(t = t || this.matrix, e = e || 3);
                    if (0 === i) return null;
                    const s = this.cofact(t, e), n = new Array(e * e);
                    for (let r = 0; r < e; r++) for (let t = 0; t < e; t++) n[r * e + t] = s[t * e + r];
                    const a = new Array(e * e);
                    for (let r = 0; r < e; r++) for (let t = 0; t < e; t++) a[r * e + t] = n[r * e + t] / i;
                    return a
                }

                mulToV(t, e, i) {
                    const s = new Array(e);
                    for (let n = 0; n < e; n++) {
                        s[n] = 0;
                        for (let a = 0; a < e; a++) s[n] += t[n * e + a] * i[a]
                    }
                    return s
                }

                cofact(t, e) {
                    const i = [];
                    for (let s = 0; s < e; s++) for (let n = 0; n < e; n++) {
                        let a = new Array((e - 1) * (e - 1)), r = 0;
                        for (let i = 0; i < e; i++) {
                            if (i == s) continue;
                            let o = 0;
                            for (let s = 0; s < e; s++) s != n && (a[r * (e - 1) + o] = t[i * e + s], o++);
                            r++
                        }
                        i[s * e + n] = ((s + n) % 2 == 1 ? -1 : 1) * this.detrm(a, e - 1)
                    }
                    return i
                }

                detrm(t, e) {
                    if (1 === e) return t[0 * e + 0];
                    let i = 1, s = 0;
                    for (let n = 0; n < e; n++) {
                        const a = new Array((e - 1) * (e - 1));
                        for (let i = 0; i < e; i++) {
                            let s = 0;
                            for (let r = 0; r < e; r++) r != n && (a[(i - 1) * (e - 1) + s] = t[i * e + r], s++)
                        }
                        s += i * (t[0 * e + n] * this.detrm(a, e - 1)), i *= -1
                    }
                    return s
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })(), Qn = (() => {
            class t {
                constructor(t) {
                    this.matrixTransform = t
                }

                setMatrix(t) {
                    this.m3x4 = t
                }

                posBySection(t, e, i, s, n) {
                    const a = this.P(this.m3x4),
                        r = [a(1, 1) - a(3, 1) * t, a(1, 2) - a(3, 2) * t, a(1, 3) - a(3, 3) * t, 0, a(2, 1) - a(3, 1) * e, a(2, 2) - a(3, 2) * e, a(2, 3) - a(3, 3) * e, 0, a(1, 1) - a(3, 1) * i, a(1, 2) - a(3, 2) * i, 0, a(1, 3) - a(3, 3) * i, a(2, 1) - a(3, 1) * s, a(2, 2) - a(3, 2) * s, 0, a(2, 3) - a(3, 3) * s],
                        o = [a(3, 4) * t - a(1, 4), a(3, 4) * e - a(2, 4), -a(3, 2) * i * n + a(3, 4) * i + a(1, 2) * n - a(1, 4), -a(3, 2) * s * n + a(3, 4) * s + a(2, 2) * n - a(2, 4)],
                        c = this.matrixTransform.inv(r, 4);
                    if (null == c) return null;
                    const l = this.matrixTransform.mulToV(c, 4, o);
                    return {radar_x: l[0], radar_y: l[1], radar_lz: l[2], radar_rz: l[3]}
                }

                P(t) {
                    return (e, i) => t[4 * (e - 1) + (i - 1)]
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(Jn))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })(), $n = (() => {
            class t {
                constructor() {
                    this.TxNone = 0, this.TxTranslate = 1, this.TxScale = 2, this.TxRotate = 4, this.TxShear = 8, this.TxProject = 10, this.mtype = this.TxNone, this.mdirty = this.TxProject
                }

                setMatrix(...t) {
                    return this.affine = new ta(t[0], t[1], t[3], t[4], t[6], t[7]), this.m13 = t[2], this.m23 = t[5], this.m33 = t[8], this.mtype = this.TxNone, this.mdirty = this.TxProject, this
                }

                setMatrixTrue() {
                    this.affine = new ta(1, 0, 0, 1, 0, 0), this.m13 = 0, this.m23 = 0, this.m33 = 1, this.mtype = this.TxNone, this.mdirty = this.TxProject
                }

                inline_type() {
                    return this.mdirty === this.TxNone ? this.mtype : this.type()
                }

                type() {
                    if (this.mdirty === this.TxNone || this.mdirty < this.mtype) return this.mtype;
                    switch (this.mdirty) {
                        case this.TxProject:
                            if (!ea(this.m13) || !ea(this.m23) || !ea(this.m33 - 1)) {
                                this.mtype = this.TxProject;
                                break
                            }
                        case this.TxShear:
                        case this.TxRotate:
                            if (!ea(this.affine.m12) || !ea(this.affine.m21)) {
                                this.mtype = ea(this.affine.m11 * this.affine.m12 + this.affine.m21 * this.affine.m22) ? this.TxRotate : this.TxShear;
                                break
                            }
                        case this.TxScale:
                            if (!ea(this.affine.m11 - 1) || !ea(this.affine.m22 - 1)) {
                                this.mtype = this.TxScale;
                                break
                            }
                        case this.TxTranslate:
                            if (!ea(this.affine.dx) || !ea(this.affine.dy)) {
                                this.mtype = this.TxTranslate;
                                break
                            }
                        case this.TxNone:
                            this.mtype = this.TxNone
                    }
                    return this.mdirty = this.TxNone, this.mtype
                }

                determinant() {
                    return this.affine.m11 * (this.m33 * this.affine.m22 - this.affine.dy * this.m23) - this.affine.m21 * (this.m33 * this.affine.m12 - this.affine.dy * this.m13) + this.affine.dx * (this.m23 * this.affine.m12 - this.affine.m22 * this.m13)
                }

                adjoint() {
                    const e = this.affine.m22 * this.m33 - this.m23 * this.affine.dy,
                        i = this.m23 * this.affine.dx - this.affine.m21 * this.m33,
                        s = this.affine.m21 * this.affine.dy - this.affine.m22 * this.affine.dx,
                        n = this.m13 * this.affine.dy - this.affine.m12 * this.m33,
                        a = this.affine.m11 * this.m33 - this.m13 * this.affine.dx,
                        r = this.affine.m12 * this.affine.dx - this.affine.m11 * this.affine.dy,
                        o = this.affine.m12 * this.m23 - this.m13 * this.affine.m22,
                        c = this.m13 * this.affine.m21 - this.affine.m11 * this.m23,
                        l = this.affine.m11 * this.affine.m22 - this.affine.m12 * this.affine.m21;
                    return (new t).setMatrix(e, n, o, i, a, c, s, r, l)
                }

                inverted(e) {
                    let i = new t;
                    i.setMatrixTrue();
                    let s = !0;
                    switch (this.inline_type()) {
                        case this.TxNone:
                            break;
                        case this.TxTranslate:
                            i.affine.dx = -this.affine.dx, i.affine.dy = -this.affine.dy;
                            break;
                        case this.TxScale:
                            s = !ea(this.affine.m11) && !ea(this.affine.m22), s && (i.affine.m11 = 1 / this.affine.m11, i.affine.m22 = 1 / this.affine.m22, i.affine.dx = -this.affine.dx * i.affine.m11, i.affine.dy = -this.affine.dy * i.affine.m22);
                            break;
                        case this.TxRotate:
                        case this.TxShear:
                            const t = {invertible: !0};
                            i.affine = this.affine.inverted(t), s = t.invertible;
                            break;
                        default:
                            const e = this.determinant();
                            s = !ea(e), s && (i = this.division(this.adjoint(), e))
                    }
                    return s && (i.mtype = this.mtype, i.mdirty = this.mdirty), e && (e.invertible = s), i
                }

                division(t, e) {
                    return 0 === e ? t : t.multyply(t, e = 1 / e)
                }

                multyply(t, e) {
                    return 1 === e || (t.affine.m11 *= e, t.affine.m12 *= e, t.m13 *= e, t.affine.m21 *= e, t.affine.m22 *= e, t.m23 *= e, t.affine.dx *= e, t.affine.dy *= e, t.m33 *= e, t.mdirty < t.TxScale && (t.mdirty = t.TxScale)), t
                }

                map(t, e) {
                    const i = this.inline_type(), s = t, n = e;
                    let a, r;
                    switch (i) {
                        case this.TxNone:
                            a = s, r = n;
                            break;
                        case this.TxTranslate:
                            a = s + this.affine.dx, r = n + this.affine.dy;
                            break;
                        case this.TxScale:
                            a = this.affine.m11 * s + this.affine.dx, r = this.affine.m22 * n + this.affine.dy;
                            break;
                        case this.TxRotate:
                        case this.TxShear:
                        case this.TxProject:
                            if (a = this.affine.m11 * s + this.affine.m21 * n + this.affine.dx, r = this.affine.m12 * s + this.affine.m22 * n + this.affine.dy, i === this.TxProject) {
                                let t = this.m13 * s + this.m23 * n + this.m33;
                                t < 1e-6 && (t = 1e-6), t = 1 / t, a *= t, r *= t
                            }
                    }
                    return new Kn(a, r)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })();

        class Kn {
            constructor(t, e) {
                this.x = t, this.y = e
            }

            setX(t) {
                return this.x = t, t
            }

            setY(t) {
                this.y = t
            }
        }

        class ta {
            constructor(t, e, i, s, n, a) {
                this.m11 = t, this.m12 = e, this.m21 = i, this.m22 = s, this.dx = n, this.dy = a
            }

            inverted(t) {
                const e = this.determinant();
                if (0 === e) return t && (t.invertible = !1), new ta(1, 0, 0, 1, 0, 0);
                {
                    t && (t.invertible = !0);
                    const i = 1 / e;
                    return new ta(this.m22 * i, -this.m12 * i, -this.m21 * i, this.m11 * i, (this.m21 * this.dy - this.m22 * this.dx) * i, (this.m12 * this.dx - this.m11 * this.dy) * i)
                }
            }

            determinant() {
                return this.m11 * this.m22 - this.m12 * this.m21
            }
        }

        function ea(t) {
            return Math.abs(t) < 1e-7
        }

        class ia {
            constructor(t, e, i, s, n) {
                this.start = t, this.text = e, this.value = i, this.type = s, this.config = n
            }

            static new(t) {
                return new ia(t.start, t.text, t.value, t.type, t.config)
            }

            getStatusText(t = !1) {
                for (const e of this.config) if ((!t || "bad" === e.type) && this.value <= e.end && this.value >= e.start && e.text) return e.text;
                return this.value < this.config[0].start ? this.config[0].text : this.value > this.config[this.config.length - 1].start ? this.config[this.config.length - 1].text : ""
            }
        }

        let sa = (() => {
            class t {
                constructor(t, e, i, s) {
                    this.httpClient = t, this.zone = e, this.cameraSelectorService = i, this.linkService = s, this.statusSubject = new h.a, this.values = new d.a(null), this.showValues = !1, window.clearStat = () => {
                        this.zone.run(() => {
                            this.sendStatClear().subscribe()
                        })
                    }, this.cameraSelectorService.cameraChanged.subscribe(t => {
                        this.getConfig()
                    })
                }

                get updateInterval() {
                    return window.update_interval || 5e3
                }

                get updateConfigInterval() {
                    return window.update_interval || 5e3
                }

                getConfig() {
                    const t = {
                        request: {
                            job: "execLib",
                            execLib: {
                                type: "mountstatus",
                                function: "GetStatusInfo",
                                params: {cameraData: this.cameraSelectorService.selectedCamera}
                            }
                        }
                    };
                    this.lastRequest = this.httpClient.post(this.linkService.getApiUrl(), JSON.stringify(t), {withCredentials: !0}).subscribe(t => {
                        const e = t.execLib.result.info, i = t.execLib.result.values,
                            s = t.execLib.result.matrixCorrected, n = t.execLib.result.showCorrectedTracks;
                        t.execLib.result.hasOwnProperty("showValues") && (this.showValues = t.execLib.result.showValues), this.isFixing = t.execLib.result.isFixing, this.status = e.map(t => ia.new(t)), this.statusSubject.next(this.status), this.values.next({
                            statuses: this.status,
                            values: i,
                            matrixCorrected: s,
                            showCorrectedTracks: n
                        }), this.getStatusInfoByTimeout()
                    }, t => this.getStatusInfoByTimeout())
                }

                sendStatClearCommand() {
                    const t = {
                        request: {
                            job: "execLib",
                            execLib: {
                                type: "mountstatus",
                                function: "ClearStat",
                                params: {cameraData: this.cameraSelectorService.selectedCamera}
                            }
                        }
                    };
                    return this.httpClient.post(this.linkService.getApiUrl(), t, {withCredentials: !0})
                }

                sendStatClear() {
                    return this.interval && clearTimeout(this.interval), this.intervalConfig && clearTimeout(this.intervalConfig), this.status && (this.status.forEach(t => t.value = 0), this.status = [...this.status], this.statusSubject.next([])), this.lastRequest && this.lastRequest.unsubscribe(), this.sendStatClearCommand().pipe(Object(G.a)(t => {
                        this.getStatusInfoByTimeout()
                    }))
                }

                getStatusInfoByTimeout() {
                    this.intervalConfig && clearTimeout(this.intervalConfig), this.lastRequest && this.lastRequest.unsubscribe(), this.intervalConfig = setTimeout(() => this.getConfig(), this.updateConfigInterval)
                }

                getSampleSize() {
                    const t = this.values.getValue();
                    if (t.values.USERADAR) {
                        if (t.values.orientation_by_matched_collections_and_radar_tracks && t.values.orientation_by_matched_collections_and_radar_tracks.sample_size) return t.values.orientation_by_matched_collections_and_radar_tracks.sample_size
                    } else if (t.values.orientation_by_collections && t.values.orientation_by_collections.sample_size) return t.values.orientation_by_collections.sample_size;
                    return 0
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(r.b), s.Sb(s.v), s.Sb(S), s.Sb(o))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })(), na = (() => {
            class t {
                constructor(t, e, i, s) {
                    this.httpClient = t, this.cameraSelectorService = e, this.statusListService = i, this.linkService = s, this.isLoading = !1, this.saveMountingConfigSubject = new h.a, this.matrix = [], this.matrix3x4 = [], this.matrixCorrected = [], this.cameraSelectorService.cameraChanged.subscribe(t => {
                        this.cameraData = this.cameraSelectorService.selectedCamera
                    }), this.mountingConfigObservable = this.cameraSelectorService.cameraChanged.pipe(Object(b.a)(() => this.getConfig()), Object(f.a)(1), Object(p.a)(), Object(G.a)(t => {
                        this.matrix = this.matrixResponse.matrix, this.matrix3x4 = this.matrixResponse.matrix3x4
                    })), this.locationConfigObservable = this.cameraSelectorService.cameraChanged.pipe(Object(b.a)(() => this.getLocationConfig()), Object(f.a)(1), Object(p.a)()), this.crossSensorConfigObservable = this.cameraSelectorService.cameraChanged.pipe(Object(b.a)(() => this.getCrossSensorConfig()), Object(f.a)(1), Object(p.a)()), this.saveMountingConfigObservable = this.saveMountingConfigSubject
                }

                getConfig() {
                    this.isLoading = !0;
                    const t = {
                        request: {
                            job: "execLib",
                            execLib: {
                                function: "getMountingConfig",
                                params: {cameraData: this.cameraData},
                                type: "SIViolationAdapter"
                            }
                        }
                    };
                    return this.httpClient.post(this.linkService.getApiUrl(), t, {withCredentials: !0}).pipe(Object(g.a)(t => {
                        if (this.isLoading = !1, t && !1 !== t.exec.result) return this.matrixResponse = t.execLib.result.matrixResponse, t.execLib.result;
                        alert(t.error || "Api error")
                    }))
                }

                saveConfig(t) {
                    this.isLoading = !0;
                    const e = {
                        request: {
                            job: "execLib",
                            execLib: {
                                function: "setMountingConfig",
                                params: {cameraData: this.cameraData, mountingConfig: t},
                                type: "SIViolationAdapter"
                            }
                        }
                    };
                    this.httpClient.post(this.linkService.getApiUrl(), e, {withCredentials: !0}).subscribe(t => {
                        this.isLoading = !1, t && !1 !== t.exec.result ? this.saveMountingConfigSubject.next(t.execLib.params.mountingConfig) : alert(t.error || "Api error")
                    }, t => {
                        this.isLoading = !1, console.log("Error:", t), alert(": " + t)
                    })
                }

                saveLocation(t) {
                    this.isLoading = !0;
                    const e = {request: {job: "setLocationConfig", cameraData: this.cameraData, locationConfig: t}};
                    this.httpClient.post(this.linkService.getApiUrl(), e, {withCredentials: !0}).subscribe(t => {
                        this.isLoading = !1, t && !1 !== t.exec.result || alert(t.error || "Api error")
                    }, t => {
                        this.isLoading = !1, console.log("Error:", t), alert(": " + t)
                    })
                }

                getLocationConfig() {
                    this.isLoading = !0;
                    const t = {request: {job: "getLocationConfig", cameraData: this.cameraData}};
                    return this.httpClient.post(this.linkService.getApiUrl(), t, {withCredentials: !0}).pipe(Object(g.a)(t => {
                        if (this.isLoading = !1, t && !1 !== t.exec.result) return t.result;
                        alert(t.error || "Api error")
                    }))
                }

                saveCrossSensor(t) {
                    this.isLoading = !0;
                    const e = {
                        request: {
                            job: "setCrossSensorConfig",
                            cameraData: this.cameraData,
                            crossSensorConfig: t
                        }
                    };
                    this.httpClient.post(this.linkService.getApiUrl(), e, {withCredentials: !0}).subscribe(t => {
                        this.isLoading = !1, t && !1 !== t.exec.result || alert(t.error || "Api error")
                    }, t => {
                        this.isLoading = !1, console.log("Error:", t), alert(": " + t)
                    })
                }

                getCrossSensorConfig() {
                    this.isLoading = !0;
                    const t = {request: {job: "getCrossSensorConfig", cameraData: this.cameraData}};
                    return this.httpClient.post(this.linkService.getApiUrl(), t, {withCredentials: !0}).pipe(Object(g.a)(t => {
                        if (this.isLoading = !1, t && !1 !== t.exec.result) return t.result;
                        alert(t.error || "Api error")
                    }))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(r.b), s.Sb(S), s.Sb(sa, 8), s.Sb(o))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac, providedIn: "root"}), t
        })(), aa = (() => {
            class t extends class {
                multiplyMatrix(t, e) {
                    const i = t.length, s = e.length, n = e[0].length, a = [];
                    if (t[0].length !== s) return [];
                    for (let r = 0; r < i; r++) a[r] = [];
                    for (let r = 0; r < n; r++) for (let n = 0; n < i; n++) {
                        let i = 0;
                        for (let a = 0; a < s; a++) i += t[n][a] * e[a][r];
                        a[n][r] = i
                    }
                    return a
                }

                getMatrix3x3From3x4(...t) {
                    return [(t = this.multiplyMatrix(t = [[t[0], t[1], t[2], t[3]], [t[4], t[5], t[6], t[7]], [t[8], t[9], t[10], t[11]]], [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, .5], [0, 0, 0, 1]]))[0][0], t[1][0], t[2][0], t[0][1], t[1][1], t[2][1], t[0][3], t[1][3], t[2][3]]
                }
            } {
                constructor(t) {
                    super(), this.mountingConfigService = t
                }

                getMatrix3x3() {
                    return 0 !== this.mountingConfigService.matrix3x4.length ? this.getMatrix3x3From3x4(...this.mountingConfigService.matrix3x4) : this.mountingConfigService.matrix
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Sb(na))
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })();

        class ra {
            constructor(t, e) {
                this.x = t, this.y = e
            }
        }

        class oa {
            constructor(t, e) {
                this.point1 = t, this.point2 = e
            }

            x1() {
                return this.point1.x
            }

            x2() {
                return this.point2.x
            }

            y1() {
                return this.point1.y
            }

            y2() {
                return this.point2.y
            }
        }

        let ca = (() => {
            class t {
                constructor() {
                    this.isLoaded = !1, this.horLinesWidth = 30, this.dyLevels = 10, this.laneCount = 5, this.dxInM = 4, this.endVert = 0, this.startVert = 0
                }

                renderBackground(t, e) {
                    this.canvas = e.nativeElement, this.context = this.canvas.getContext("2d"), this.mountingConfig = t, this.canvas.width = this.canvas.offsetWidth, this.canvas.height = this.canvas.offsetHeight, this.dy = this.canvas.height / (this.dyLevels + 1), this.mainHorLine = new oa(new ra(this.horLinesWidth, this.dy * this.dyLevels), new ra(this.canvas.width - this.horLinesWidth, this.dy * this.dyLevels)), this.dxInPx = (this.mainHorLine.x2() - this.horLinesWidth) / (this.laneCount + 1), this.fromLeftRoadSideDistance = this.mountingConfig.roadDistance, this.position = this.mountingConfig.position, this.distanceDirection = this.mountingConfig.distanceDirection;
                    const i = this.mountingConfig.matrixResponse.anchor;
                    if (this.startVert = this.mountingConfig.height > 4 ? Math.ceil(i[0]) / 10 * 10 : this.mountingConfig.startVertConst, this.endVert = Math.ceil(this.mountingConfig.height > 4 ? i[0] + 45 : this.mountingConfig.endVertConst) / 10 * 10, "BELOW" !== this.position ? this.mainVertLine = "LEFT" === this.position ? new oa(new ra(this.mainHorLine.x2(), 0), new ra(this.mainHorLine.x2(), this.mainHorLine.y2())) : new oa(new ra(this.mainHorLine.x1(), 0), new ra(this.mainHorLine.x1(), this.mainHorLine.y1())) : (this.laneCountFromLeft = Math.abs(this.fromLeftRoadSideDistance) / this.dxInM + 1, 0 === this.distanceDirection && (this.laneCountFromLeft = this.laneCount - this.laneCountFromLeft + 1), this.mainVertLine = new oa(new ra(this.mainHorLine.x1() + this.laneCountFromLeft * this.dxInPx, 0), new ra(this.mainHorLine.x1() + this.laneCountFromLeft * this.dxInPx, this.mainHorLine.y1()))), this.drawLine(this.mainHorLine, 2), this.drawLine(this.mainVertLine, 2), "BELOW" !== this.position) {
                        if ("RIGHT" === this.position) {
                            for (let t = 1; t <= this.laneCount; t++) this.drawLine(new oa(new ra(this.mainHorLine.x1() + this.dxInPx * t, 0), new ra(this.mainHorLine.x1() + this.dxInPx * t, this.mainHorLine.y1())), 1), this.drawText(new ra(this.mainHorLine.x1() + this.dxInPx * t - 8, this.mainHorLine.y1() + 15), this.dxInM * t);
                            this.drawText(new ra(this.mainHorLine.x1() - 8, this.mainHorLine.y1() + 15), "0")
                        } else if ("LEFT" === this.position) {
                            for (let t = 1; t <= this.laneCount; t++) this.drawLine(new oa(new ra(this.mainHorLine.x2() - this.dxInPx * t, 0), new ra(this.mainHorLine.x2() - this.dxInPx * t, this.mainHorLine.y1()))), this.drawText(new ra(this.mainHorLine.x2() - this.dxInPx * t - 8, this.mainHorLine.y1() + 15), this.dxInM * t);
                            this.drawText(new ra(this.mainHorLine.x2() - 8, this.mainHorLine.y1() + 15), "0")
                        }
                    } else for (let s = 1; s <= this.laneCount; s++) this.drawLine(new oa(new ra(this.mainHorLine.x1() + this.dxInPx * s, 0), new ra(this.mainHorLine.x1() + this.dxInPx * s, this.mainHorLine.y1()))), this.drawText(new ra(this.mainHorLine.x1() + this.dxInPx * s - 8, this.mainHorLine.y1() + 15), Math.round(this.dxInM * (s - this.laneCountFromLeft) * 100) / 100);
                    if (this.dyRadarValue = Math.ceil((this.endVert - this.startVert) / this.dyLevels), "LEFT" === this.position || "BELOW" === this.position && 0 === this.distanceDirection) for (let s = 1; s < this.dyLevels; s++) this.drawLine(new oa(new ra(this.mainHorLine.x1() + 5 + this.horLinesWidth, this.mainHorLine.y2() - this.dy * s), new ra(this.mainHorLine.x1() + 5, this.mainHorLine.y2() - this.dy * s))), this.drawText(new ra(this.mainHorLine.x1() + this.horLinesWidth / 2, this.mainHorLine.y2() - this.dy * s + 13), s * this.dyRadarValue + this.startVert); else for (let s = 1; s < this.dyLevels; s++) this.drawLine(new oa(new ra(this.mainHorLine.x2() - 5 - this.horLinesWidth, this.mainHorLine.y2() - this.dy * s), new ra(this.mainHorLine.x2() - 5, this.mainHorLine.y2() - this.dy * s))), this.drawText(new ra(this.mainHorLine.x2() - this.horLinesWidth, this.mainHorLine.y2() - this.dy * s + 13), s * this.dyRadarValue + this.startVert);
                    this.isLoaded = !0
                }

                drawText(t, e) {
                    this.context.beginPath(), this.context.font = "12px serif", this.context.fillStyle = "black", this.context.fillText(e, t.x + 4, t.y - 3), this.context.stroke(), this.context.closePath()
                }

                drawLine(t, e = 1) {
                    this.context.beginPath(), this.context.fillStyle = "black", this.context.lineWidth = e, this.context.moveTo(t.point1.x, t.point1.y), this.context.lineTo(t.point2.x, t.point2.y), this.context.stroke(), this.context.closePath()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })();
        i("eevI"), i("ERl3");
        let la = (() => {
            class t {
            }

            return t.\u0275mod = s.Gb({type: t}), t.\u0275inj = s.Fb({
                factory: function (e) {
                    return new (e || t)
                }, providers: [], imports: [[qn]]
            }), t
        })();
        const ha = ["container"];
        let ua = (() => {
            class t extends kt {
                constructor() {
                    super(...arguments), this.frameIndex = 0, this.updateEveryNFrame = 2, this.updateCanvasSizeOnDimensionsChange = !1, this.display = !1, this.inited = !1
                }

                ngAfterViewInit() {
                    this.restorePosition()
                }

                restorePosition() {
                    try {
                        const t = JSON.parse(localStorage.getItem("zoomDraggable.position"));
                        this.container.nativeElement.style.top = t.y + "px", this.container.nativeElement.style.left = t.x + "px"
                    } catch (t) {
                    }
                }

                updateImage() {
                    if (this.cropSettings) {
                        if (!this.canvas.width && this.cropSettings && (this.canvas.width = this.cropSettings.w, this.canvas.height = this.cropSettings.h), (this.display || !(this.frameIndex > 0)) && !(this.frameIndex > 0 && this.frameIndex < this.updateEveryNFrame)) {
                            if (this.appSnapshotDrawer.context) {
                                const t = this.appSnapshotDrawer.context.getImageData(this.cropSettings.x, this.cropSettings.y, this.cropSettings.w, this.cropSettings.h);
                                this.context.putImageData(t, 0, 0)
                            } else this.context.drawImage(this.appSnapshotDrawer.img, this.cropSettings.x, this.cropSettings.y, this.cropSettings.w, this.cropSettings.h);
                            this.frameIndex = 0
                        }
                    } else this.frameIndex = 0
                }

                onSnapshotData(t) {
                    this.frameIndex++, this.updateImage()
                }

                onDimensionsChanged(t) {
                    this.frameIndex = 0
                }

                setCropSettings(t) {
                    this.cropSettings = t, null === this.cropSettings ? (this.display = !1, this.inited = !1) : this.inited = !0, this.frameIndex = 0, this.updateImage()
                }

                savePosition(t) {
                    localStorage.setItem("zoomDraggable.position", JSON.stringify(t.source.element.nativeElement.getBoundingClientRect()))
                }
            }

            return t.\u0275fac = function (e) {
                return da(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-zoom-draggable"]],
                viewQuery: function (t, e) {
                    var i;
                    1 & t && s.tc(ha, !0), 2 & t && s.kc(i = s.Wb()) && (e.container = i.first)
                },
                inputs: {appSnapshotDrawer: "appSnapshotDrawer"},
                features: [s.tb],
                decls: 8,
                vars: 1,
                consts: [[1, "draggable-box-container", 3, "hidden"], ["container", ""], ["cdkDrag", "", 1, "draggable-box", 3, "cdkDragEnded"], ["width", "0", 1, "zoom-canvas"], ["canvas", ""], ["cdkDragHandle", "", 1, "crosshair"]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "div", 0, 1), s.Ob(2, "div", 2), s.Vb("cdkDragEnded", (function (t) {
                        return e.savePosition(t)
                    })), s.Jb(3, "canvas", 3, 4), s.Ob(5, "div", 5), s.Ob(6, "mat-icon"), s.xc(7, "open_with"), s.Nb(), s.Nb(), s.Nb(), s.Nb()), 2 & t && s.ec("hidden", !e.display || !e.cropSettings)
                },
                directives: [cn.a, cn.b, Bt.a],
                styles: [".zoom-canvas[_ngcontent-%COMP%]{max-width:298px}.draggable-box-container[_ngcontent-%COMP%]{position:absolute;max-width:300px;z-index:10}.draggable-box[_ngcontent-%COMP%]{max-width:300px;border:1px solid #ccc;background-color:rgba(216,40,156,.87);color:rgba(0,0,0,.87);display:flex;justify-content:center;align-items:center;text-align:center;background:#fff;border-radius:4px;position:relative;z-index:1;transition:box-shadow .2s cubic-bezier(0,0,.2,1);box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.draggable-box[_ngcontent-%COMP%]:active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.crosshair[_ngcontent-%COMP%]{position:absolute;cursor:move;top:0;right:0;padding:12px;color:hsla(0,0%,100%,.3)}"],
                changeDetection: 0
            }), t
        })();
        const da = s.Qb(ua);
        let ma = (() => {
            class t extends kt {
                setLandmarkPolygon(t) {
                    this.landmarkPolygon = t, this.drawLandmark()
                }

                onDimensionsChanged() {
                    this.drawLandmark()
                }

                drawLandmark() {
                    this.landmarkPolygon ? (this.clearCanvas(), this.context.lineWidth = 7, this.context.beginPath(), this.context.strokeStyle = "#f00", this.context.moveTo(this.landmarkPolygon.topLeft.x, this.landmarkPolygon.topLeft.y), this.context.lineTo(this.landmarkPolygon.bottomLeft.x, this.landmarkPolygon.bottomLeft.y), this.context.stroke(), this.context.beginPath(), this.context.strokeStyle = "#f00", this.context.moveTo(this.landmarkPolygon.bottomLeft.x, this.landmarkPolygon.bottomLeft.y), this.context.lineTo(this.landmarkPolygon.bottomRight.x, this.landmarkPolygon.bottomRight.y), this.context.stroke(), this.context.beginPath(), this.context.strokeStyle = "#f00", this.context.moveTo(this.landmarkPolygon.bottomRight.x, this.landmarkPolygon.bottomRight.y), this.context.lineTo(this.landmarkPolygon.topRight.x, this.landmarkPolygon.topRight.y), this.context.stroke(), this.context.beginPath(), this.context.strokeStyle = "#f00", this.context.moveTo(this.landmarkPolygon.topRight.x, this.landmarkPolygon.topRight.y), this.context.lineTo(this.landmarkPolygon.topLeft.x, this.landmarkPolygon.topLeft.y), this.context.stroke()) : this.clearCanvas()
                }
            }

            return t.\u0275fac = function (e) {
                return ba(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-landmark-drawer"]],
                features: [s.tb],
                decls: 2,
                vars: 1,
                consts: [[1, "canvas-layer", "landmark-drawer", 3, "hidden"], ["canvas", ""]],
                template: function (t, e) {
                    1 & t && s.Jb(0, "canvas", 0, 1), 2 & t && s.ec("hidden", !e.landmarkPolygon)
                },
                styles: [".canvas-layer[_ngcontent-%COMP%]{position:absolute;width:100%}"]
            }), t
        })();
        const ba = s.Qb(ma);
        let ga = (() => {
            class t extends kt {
                constructor() {
                    super(...arguments), this.fontSize = 10, this.lineWidth = 1
                }

                setTrackForRender(t) {
                    this.context.beginPath();
                    const e = t.color;
                    t.points.forEach((i, s) => {
                        const n = i.x, a = i.y;
                        0 === s && this.context.moveTo(n, a), this.setDrawProperty(n, a, e), t.number && t.points.length - 1 === s && (this.context.font = this.fontSize + "px serif", this.context.fillStyle = t.color, this.context.fillText(t.id, n + 4, a - 4))
                    }), this.context.closePath()
                }

                setDrawProperty(t, e, i = "blue", s = this.lineWidth) {
                    this.context.lineWidth = s, this.context.strokeStyle = i, this.context.lineTo(t, e), this.context.stroke()
                }
            }

            return t.\u0275fac = function (e) {
                return fa(e || t)
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["ng-component"]],
                features: [s.tb],
                decls: 0,
                vars: 0,
                template: function (t, e) {
                },
                encapsulation: 2
            }), t
        })();
        const fa = s.Qb(ga);
        let pa = (() => {
            class t {
            }

            return t.\u0275mod = s.Gb({type: t}), t.\u0275inj = s.Fb({
                factory: function (e) {
                    return new (e || t)
                },
                providers: [A.e, Qn, $n, aa, ca, Jn],
                imports: [[Nt.b, r.c, cn.c, Rn.forChild("video-player"), qn, la], cn.c]
            }), t
        })(), Sa = (() => {
            class t {
                constructor() {
                    this.wasSent = !1
                }

                intercept(t, e) {
                    if (void 0 !== document.selectedDevice && t.url.includes("api")) {
                        let i, s = t.body;
                        return "string" == typeof t.body && (s = JSON.parse(t.body)), i = t.clone(this.wasSent ? {
                            withCredentials: !0,
                            body: s
                        } : {
                            withCredentials: !0,
                            body: {...s, auth: {login: "system", password: document.selectedDevice.pwd}}
                        }), e.handle(i).pipe(Object(G.a)(t => {
                        }))
                    }
                    return e.handle(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = s.Eb({token: t, factory: t.\u0275fac}), t
        })(), va = (() => {
            class t {
            }

            return t.\u0275mod = s.Gb({type: t}), t.\u0275inj = s.Fb({
                factory: function (e) {
                    return new (e || t)
                }, providers: [], imports: [[Nt.b, cn.c, pa]]
            }), t
        })(), wa = (() => {
            class t {
            }

            return t.\u0275mod = s.Gb({type: t}), t.\u0275inj = s.Fb({
                factory: function (e) {
                    return new (e || t)
                },
                providers: [{provide: r.a, useClass: Sa, multi: !0}],
                imports: [[c.a, r.c, Rn.forChild("camera"), Ce.d, vn.b, Xn, pa, qn, va], Xn]
            }), t
        })();

        function xa(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "button", 5), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().cancel()
                })), s.xc(1), s.ac(2, "translate"), s.Nb()
            }
            2 & t && (s.wb(1), s.zc(" ", s.bc(2, 1, "cancel"), " "))
        }

        function Ca(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "button", 5), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().close()
                })), s.xc(1), s.ac(2, "translate"), s.Nb()
            }
            2 & t && (s.wb(1), s.zc(" ", s.bc(2, 1, "close"), " "))
        }

        function ya(t, e) {
            if (1 & t) {
                const t = s.Pb();
                s.Ob(0, "button", 6), s.Vb("click", (function () {
                    return s.oc(t), s.Zb().apply()
                })), s.xc(1), s.ac(2, "translate"), s.Nb()
            }
            2 & t && (s.wb(1), s.zc(" ", s.bc(2, 1, "apply"), " "))
        }

        let Oa = (() => {
            class t {
                constructor(t, e, i = {}) {
                    this.translate = t, this.dialogRef = e, this.showCancel = !1, this.showClose = !1, this.showApply = !1, this.showCancel = i.showCancel, this.showClose = i.showClose, this.showApply = i.showApply, this.messages = i.messages ? i.messages : this.translate.instant("question_action"), this.title = i.title ? i.title : this.translate.instant(this.showApply ? "confirm" : "alert")
                }

                cancel() {
                    this.dialogRef.close(!1)
                }

                close() {
                    this.dialogRef.close(!1)
                }

                apply() {
                    this.dialogRef.close(!0)
                }

                ngOnInit() {
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(s.Ib(A.e), s.Ib(Lt.f), s.Ib(Lt.a))
            }, t.\u0275cmp = s.Cb({
                type: t,
                selectors: [["app-confirm"]],
                decls: 9,
                vars: 5,
                consts: [["mat-dialog-title", ""], [3, "innerHtml"], [1, "flex-wide", "space-between", "align-right"], ["mat-raised-button", "", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-raised-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click"]],
                template: function (t, e) {
                    1 & t && (s.Ob(0, "h2", 0), s.xc(1), s.Nb(), s.Ob(2, "mat-dialog-content"), s.Jb(3, "div", 1), s.Nb(), s.Ob(4, "mat-dialog-actions"), s.Ob(5, "div", 2), s.vc(6, xa, 3, 3, "button", 3), s.vc(7, Ca, 3, 3, "button", 3), s.vc(8, ya, 3, 3, "button", 4), s.Nb(), s.Nb()), 2 & t && (s.wb(1), s.yc(e.title), s.wb(2), s.ec("innerHtml", e.messages, s.pc), s.wb(3), s.ec("ngIf", e.showCancel), s.wb(1), s.ec("ngIf", e.showClose), s.wb(1), s.ec("ngIf", e.showApply))
                },
                directives: [Lt.g, Lt.d, Lt.c, Nt.g, Vt.a],
                pipes: [A.d],
                styles: [""]
            }), t
        })(), Ia = (() => {
            class t {
            }

            return t.\u0275mod = s.Gb({type: t}), t.\u0275inj = s.Fb({
                factory: function (e) {
                    return new (e || t)
                }, providers: [Oa], imports: [[qn, Rn.forChild("confirm")]]
            }), t
        })(), Ea = (() => {
            class t {
            }

            return t.\u0275mod = s.Gb({type: t, bootstrap: [Sn]}), t.\u0275inj = s.Fb({
                factory: function (e) {
                    return new (e || t)
                },
                providers: [{provide: r.a, useClass: Sa, multi: !0}, o],
                imports: [[c.a, r.c, vn.b, ge.b, wa, Rn.forRootOnlyChildLang(), Ia]]
            }), t
        })();
        Object(s.N)(), c.d().bootstrapModule(Ea)
    }, zn8P: function (t, e) {
        function i(t) {
            return Promise.resolve().then((function () {
                var e = new Error("Cannot find module '" + t + "'");
                throw e.code = "MODULE_NOT_FOUND", e
            }))
        }

        i.keys = function () {
            return []
        }, i.resolve = i, t.exports = i, i.id = "zn8P"
    }
}, [[0, 0, 5]]]);