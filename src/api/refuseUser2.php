<?php
    $id = $_GET['id'];
    $con = mysqli_connect('liuyongle.io','liuyongle','123456','background');
    $sql = "DELETE FROM `box` WHERE `id` = $id";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('数据库链接失败'.mysqli_error($con));
    }
    print_r(json_encode(array(
        'code'=>$res,
        'msg'=>'修改数据成功'
    ),JSON_UNESCAPED_UNICODE))
?>