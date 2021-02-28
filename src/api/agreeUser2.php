<?php
    $userName = $_POST['userName'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $con = mysqli_connect('liuyongle.io','liuyongle','123456','background');
    $sql = "INSERT INTO `user` VALUES(null,'$userName','$password','visitor','$email')";
    $sql1 = "DELETE FROM `box` WHERE `userName`='$userName'";
    $res = mysqli_query($con,$sql);
    $res1 = mysqli_query($con,$sql1);
    if(!($res&&$res1)){
        die('数据库链接失败' . mysqli_error($con));
    }

    print_r(json_encode(array(
        'code'=>1,
        'msg'=>'修改数据成功'
    ),JSON_UNESCAPED_UNICODE))
?>