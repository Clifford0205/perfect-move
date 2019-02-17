function getStyle(obj, name) {

    return getComputedStyle(obj, false)[name];

}

function startMove(obj, json, FnEnd) {

    clearInterval(obj.timer);

    obj.timer = setInterval(
        function () {
            var bstop = true; //假設所有的值都已經到了
            for (var attr in json) {
                var cur = 0;
                // 用parseInt(getStyle(oBox,'height'))取代offsetHeight，表示目前的高度
                // parseInt的用意是為了不取到px

                if (attr == 'opacity') {
                    cur = getStyle(obj, attr) * 100;
                    console.log(cur);
                } else {
                    cur = parseInt(getStyle(obj, attr));
                }

                var speed = (json[attr] - cur) / 6;

                if (speed > 0) {
                    speed = Math.ceil(speed);
                } else {
                    speed = Math.floor(speed);
                }

                if (cur != json[attr])
                    bstop = false;


                if (attr == 'opacity') {
                    obj.style[attr] = (cur + speed) / 100;

                } else {
                    obj.style[attr] = cur + speed + 'px';
                }


            }
            if (bstop) {
                clearInterval(obj.timer);
                if (FnEnd) FnEnd();
            }
        }, 30)

}