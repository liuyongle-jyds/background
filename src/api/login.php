<?php
    $userName = $_POST['userName'];
    $password = $_POST['password'];
    $con = mysqli_connect('liuyongle.io','liuyongle','123456','background');
    $sql = "SELECT * FROM `user` WHERE `userName`='$userName' AND `password`='$password'";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('error for mysql: ' . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
    
    if(!$row){
        print_r(json_encode(array(
            'code'=>0,
            'message'=>'登录失败'
        )));
    }else{
        print_r(json_encode(array(
            'code'=>1,
            'message'=>'登录成功',
            'grade'=>$row['grade']
        )));
    }
?>