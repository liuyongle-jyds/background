<?php
    $current = $_GET['current'];
    $length = $_GET['length'];
    $start = ($current-1)*$length;
    $con = mysqli_connect('liuyongle.io','liuyongle','123456','background');
    $sql = "SELECT * FROM `order1` LIMIT $start,$length";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('error'.mysqli_error($con));
    }
    $arr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }

    $sql1 = "SELECT COUNT(*) `num` FROM `order1`";
    $res1 = mysqli_query($con,$sql1);
    if(!$res1){
        die('error' . mysqli_error($con));
    }
    $row1 = mysqli_fetch_assoc($res1);
    print_r(json_encode(array(
        'total'=>$row1['num'],
        'list'=>$arr,
        'code'=>1,
        'message'=>'获取列表数据成功'
    ),JSON_UNESCAPED_UNICODE));
?>