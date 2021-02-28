<?php
    $str = $_GET['str'];
    $con = mysqli_connect('liuyongle.io','liuyongle','123456','background');
    $sql = "SELECT * FROM `goods` WHERE `goods_id` in $str";
    $res = mysqli_query($con,$sql);
    
    if(!$res){
        die('数据库链接失败' . mysqli_error($con));
    }
    $arr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    print_r(json_encode(array(
        'code'=>1,
        'msg'=>'修改数据成功',
        'data'=>$arr
    ),JSON_UNESCAPED_UNICODE))
?>