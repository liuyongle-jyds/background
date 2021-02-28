<?php
    $demo = $_GET['demo'];
    $num = $_GET['num'];
    $flag = $_GET['flag'];
    $con = mysqli_connect('liuyongle.io','liuyongle','123456','background');
    
    if($demo == 'allout'){
        $sql = "UPDATE `goods` SET `goods_state`=0,`upd_time`=now() ";
    }else if($demo == 'allin'){
        $sql = "UPDATE `goods` SET `goods_state`=2,`upd_time`=now() ";
    }else if($num =='del'){
        if($flag=='all'){
            $sql = "DELETE FROM `goods`";
        }else{
            $sql = "DELETE FROM `goods` WHERE `goods_id` in $demo";
        }
        
    }else {
        if($demo=='seach'){
            $sql = "UPDATE `goods` SET `goods_state`= $num,`upd_time`=now() WHERE `goods_id` in $flag";
        }else{
            $sql = "UPDATE `goods` SET `goods_state`= $num,`upd_time`=now() WHERE `goods_id` in $demo";
        }
        
    }
    
        
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('数据库链接失败' . mysqli_error($con));
    }
    print_r(json_encode(array(
        'code'=>$res,'msg'=>'修改数据成功'
    ),JSON_UNESCAPED_UNICODE))
?>