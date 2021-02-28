<?php
    $userName = $_POST['userName'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $con = mysqli_connect('liuyongle.io','liuyongle','123456','background');
    $sql = "INSERT INTO `box` VALUES(null,'$userName','$password','$email')";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('数据库链接失败' . mysqli_error($con));
    }
    print_r(json_encode(array(
        'code'=>$res,
        'msg'=>'提交数据成功'
    ),JSON_UNESCAPED_UNICODE))
?>