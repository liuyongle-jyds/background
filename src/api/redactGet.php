<?php
    $goods_id = $_GET['goods_id'];
    $con = mysqli_connect('liuyongle.io','liuyongle','123456','background');
    $sql = "SELECT * FROM `goods` WHERE `goods_id`='$goods_id'";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
    if($row){
        print_r(json_encode(array(
            'code'=>1,
            'data'=>$row
        ),JSON_UNESCAPED_UNICODE));
    }else{
        print_r(json_encode(array(
            'code'=>0,
            'data'=>$row
        ),JSON_UNESCAPED_UNICODE));
    }
    
?>