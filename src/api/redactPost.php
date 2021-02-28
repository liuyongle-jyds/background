<?php
    $arr = $_POST['arr'];
    $id = $_POST['id'];
    $con = mysqli_connect('liuyongle.io','liuyongle','123456','background');
    $sql = "UPDATE `goods` SET `goods_name`='$arr[0]' , `goods_big_logo`='$arr[1]' , `goods_price`='$arr[2]' , `goods_number`='$arr[3]' , `cat_one_id`='$arr[4]' , `cat_two_id`='$arr[5]' , `cat_three_id`='$arr[6]' , `goods_introduce`='$arr[7]',`upd_time`=now() WHERE `goods_id`='$id'";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('数据库链接失败'.mysqli_error($con));
    }
    print_r(json_encode(array(
        'code'=>$res,
        'msg'=>'修改数据成功'
    ),JSON_UNESCAPED_UNICODE))
?>
