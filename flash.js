(function (window, document) {
    var flash_plugin = function (options, targetDom) {
        if (!(this instanceof flashPlugin)) return new flash_plugin(options, targetDom);
        console.log(this)

        this.options = this.extend({
            text: "Adobe Flash Player 因过期而遭到阻止。",
            href: "#",
            sourceUrl: "#"
        }, options)

        if ((typeof targetDom) === "string") {
            this.targetDom = document.querySelector(targetDom);
        } else {
            this.targetDom = targetDom
        }

        var boxDom = document.createElement("div")
        var textDom = document.createElement("span")
        var btnDom1 = document.createElement("button")
        var btnDom2 = document.createElement("button")
        var fontDom1 = document.createElement("i")
        var linkDom = document.createElement("a")
        var fontDom2 = document.createElement("button")
        fontDom2.innerHTML = "×"
        textDom.innerHTML = this.options.text
        btnDom1.innerHTML = "更新插件..."
        btnDom2.innerHTML = "运行一次"
        linkDom.innerHTML = "了解详情"

        if (!(hasClass(fontDom1, "fa") && hasClass(fontDom1, "fa-puzzle-piece"))) {
            if (!(hasClass(fontDom1, "fa") || hasClass(fontDom1, "fa-puzzle-piece"))) {
                addClass(fontDom1, "fa")
                addClass(fontDom1, "fa-puzzle-piece")
            } else {
                hasClass(fontDom1, "fa") ? addClass(fontDom1, "fa-puzzle-piece") : addClass(fontDom1, "fa")
            }
        }

        // btnClass = "outline:none;color: #333;background-color: #FEF9E2;border-color: #ccc;display: inline-block;padding: 3px 5px;margin-top: 1px;font-size: 14px;font-weight: 500;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid #D0D0D1;border-radius: 4px;"

        fontDom1.style.cssText = "float: left;color: #5A5A5A;font-size: 1.4em;line-height: 30px;margin-left: 10px;"            
        textDom.style.cssText = "display: inline-block;height:30px;font-size: 14px;line-height: 30px; float: left;margin-left: 0px;"
        boxDom.style.cssText = "display: none; position: absolute;top: 0;left: 0;height: 30px;width: 100%;padding: 3px 0;background-color: #FCEBA0;z-index: 9999;border: 1px solid #D0D0D1;border-left: 0;border-right: 0;"
        btnDom1.style.cssText = "margin-left: 20px";
        btnDom2.style.cssText = "margin-left: 10px";
        fontDom2.style.cssText = "outline:none;float: right;margin-right: 12px;font-size: 21px;font-weight: 700;line-height: 30px;color: #000;text-shadow: 0 1px 0 #fff;filter: alpha(opacity=20);opacity: .2;-webkit-appearance: none;padding: 0;cursor: pointer;background: 0 0;border: 0;"

        linkDom.setAttribute("href",this.options.href)
        linkDom.style.cssText = "font-size: 12px; float: right;margin-right: 50px;line-height: 30px;"


        boxDom.appendChild(fontDom1);
        boxDom.appendChild(textDom);
        boxDom.appendChild(btnDom1);
        boxDom.appendChild(btnDom2);
        boxDom.appendChild(fontDom2);
        boxDom.appendChild(linkDom);
 
        var btnList = boxDom.getElementsByTagName("button")
        console.log(btnList)
        for(var i = 0; i < btnList.length; i++) {
            addClass(btnList[i],"btn")
            console.log(i)
        }
        styleElement = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(styleElement);
        styleElement.appendChild(document.createTextNode('.btn:hover {background-color: #e6e6e6}'));
        styleElement.appendChild(document.createTextNode('.btn {outline:none;color: #333;background-color: #FEF9E2;border-color: #ccc;display: inline-block;padding: 3px 5px;margin-top: 1px;font-size: 14px;font-weight: 500;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid #D0D0D1;border-radius: 4px;}'));

        this.boxDom = boxDom;
        this.init()
    }

    flash_plugin.prototype = {
        init: function() {
            console.log(this)
            this.event()
        },
        extend: function (obj, obj2) {
            for (var k in obj2) {
                if(obj2[k] != ""){
                    obj[k] = obj2[k];
                }
            }
            return obj;
        },
        setStyle: function (dom, objStyle) {
            for (var k in objStyle) {
                dom.style[k] = objStyle[k];
            }
        },
        event: function () {
            var _this = this;
            console.log(this)

            if(this.targetDom) {
                this.targetDom.addEventListener("click", function () {
                    document.body.appendChild(_this.boxDom);
                    _this.boxDom.style.display = "block";
                }, false);
            } else {
                document.body.appendChild(_this.boxDom);
                _this.boxDom.style.display = "block";
            }
            

            console.log(this.boxDom.childNodes)
            this.boxDom.childNodes[2].addEventListener("click", function () {
                window.location.href = _this.options.sourceUrl
            }, false);

            this.boxDom.childNodes[3].addEventListener("click", function () {
                _this.boxDom.style.display = "none";
            }, false);

            this.boxDom.childNodes[4].addEventListener("click", function () {
                _this.boxDom.style.display = "none";
            }, false);
        }
    }

    function hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function addClass(obj, cls) {
        if (!hasClass(obj, cls)) obj.className += " " + cls;
    }

    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    }

    window.flashPlugin = flash_plugin
})(window, document)