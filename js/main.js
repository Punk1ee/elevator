/**
 * Created by punkLee on 17/10/24.
 */


$(function () {
    var $elevator  = $(".elevator");
    var $leftDoor  = $(".left-door");
    var $rightDoor = $(".right-door");
    var $up    = $(".up");
    var $down   = $(".down");

    upDownFloor($up,$elevator,$leftDoor,$rightDoor);
    upDownFloor($down,$elevator,$leftDoor,$rightDoor);
});

function upDownFloor($upDown,$elevator,$leftDoor,$rightDoor) {

    

    $upDown.on("click",function () {

        //1.获取变量
        //获取电梯当前所处的楼层
        var currentElevatorFloor = parseInt($(".elevator").css("bottom")) / 140 + 1;

        //获取电梯现在所要去的楼层
        var positionFloor = $(this).closest(".up-down").siblings(".number").text(),
            positionFloorHeight = (positionFloor - 1) * 140 + "px";

        //获取电梯要运行的楼层
        var moveFloor = Math.abs(positionFloor - currentElevatorFloor);

        //获取本次点击的按钮下标和按钮集合的长度
        var index = $(this).parents(".floor").index(),
            upDown_length = $upDown.length;

        //2.为本次点击的按钮设置css效果
        if(($(this).hasClass("no-use") && index === 0) || ($(this).hasClass("no-use") && index === upDown_length - 1)){
            return;
        }else{
            $(this).addClass("active");
        }

        //3.运作电梯
        if(($(this).hasClass("no-use") && index === 0) || ($(this).hasClass("no-use") && index === upDown_length - 1)){
            return;
        }else{
            $elevator.animate({bottom : positionFloorHeight},moveFloor * 1000,function () {

                //a.设置开关门动画
                $leftDoor.addClass("open-close");
                $rightDoor.addClass("open-close");

                //b.将本次点击的上下键按钮去除css效果
                $upDown.eq(index).removeClass("active");

            });
        }

        //4.将开关门动画去除，若是不去除，下次点击事件则不能执行开关门动画
        $leftDoor.removeClass("open-close");
        $rightDoor.removeClass("open-close");

    })
}


