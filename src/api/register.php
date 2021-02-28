<?php
    $userName = $_POST['userName'];
    $con = mysqli_connect('liuyongle.io','liuyongle','123456','background');
    $sql1 = "SELECT * FROM `user` WHERE `userName`='$userName'";
    $sql2 = "SELECT * FROM `box` WHERE `userName`='$userName'";
    $res1 = mysqli_query($con,$sql1);
    $res2 = mysqli_query($con,$sql2);
    if(!$res1){
        die('error for mysql1: ' . mysqli_error($con));
    }
    if(!$res2){
        die('error for mysql2: ' . mysqli_error($con));
    }
    $row1 = mysqli_fetch_assoc($res1);
    $row2 = mysqli_fetch_assoc($res2);
    
    if(!($row1||$row2)){
        
        
        print_r(json_encode(array(
            'code'=>1,
            'message'=>'可用用户名'
        ),JSON_UNESCAPED_UNICODE));
    }else{
        print_r(json_encode(array(
            'code'=>0,
            'message'=>'用户名已存在！',
        ),JSON_UNESCAPED_UNICODE));
    }
?>