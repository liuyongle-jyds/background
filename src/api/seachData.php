<?php
    $current = $_GET['current'];
    $length = $_GET['length'];
    $key = $_GET['key'];
    $check = $_GET['check'];
    $start = ($current-1)*$length;
    $con = mysqli_connect('liuyongle.io','liuyongle','123456','background');
    if($check=='word'){
        $sql = "SELECT * FROM `goods` WHERE `goods_name` LIKE '%$key%' ORDER BY `goods_id` ASC LIMIT $start,$length";
    }else{
        $sql = "SELECT * FROM `goods` WHERE `goods_id`=$key";
    }
    $res = mysqli_query($con,$sql);
    if(!$res&&$key!=null){
        die('error'.mysqli_error($con));
    }
    $arr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    if($check=='word'){
        $sql1 = "SELECT COUNT(*) `num` FROM `goods` WHERE `goods_name` LIKE '%$key%'";
    }else{
        $sql1 = "SELECT COUNT(*) `num` FROM `goods` WHERE `goods_id`=$key";
    }
    
    $res1 = mysqli_query($con,$sql1);
    if(!$res1){
        die('error' . mysqli_error($con));
    }
    $row1 = mysqli_fetch_assoc($res1);
    print_r(json_encode(array(
        'total'=>$row1['num'],
        'list'=>$arr,
        'code'=>1,
        'message'=>'获取列表数据成功',
        'key'=>$key,
        'check'=>$check
    ),JSON_UNESCAPED_UNICODE));
?>