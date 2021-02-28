<?php
    $str = $_POST['str'];

    $con = mysqli_connect('liuyongle.io','liuyongle','123456','background');
    
    $sql = "INSERT INTO `goods` (`goods_name`,`goods_big_logo`,`goods_price`,`goods_number`,`cat_one_id`,`cat_two_id`,`cat_three_id`,`goods_introduce`,`add_time`,`upd_time`) VALUES($str)";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('数据库链接失败'.mysqli_error($con));
    }
    print_r(json_encode(array(
        'code'=>$res,
        'msg'=>'修改数据成功'
    ),JSON_UNESCAPED_UNICODE))
?>