<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Milon\Barcode\DNS1D;
use Milon\Barcode\DNS2D;
use Torann\GeoIP\Facades\GeoIP;

class TestController extends Controller
{
    //
    public function index()
    {
        //notify()->success('哦吼哈？!');
        //connectify('error','哦吼吼?','哦哦哦');
        // return view('test');
        //echo DNS1D::getBarcodeHTML("4445645656", "QRCODE");
        //echo DNS2D::getBarcodeHTML("4445645656", "QRCODE");
        //echo DNS2D::getBarcodePNGPath("4445645656", "PDF417");
        //echo DNS2D::getBarcodePNGPath("4445645656", "PDF417");
        // $test_code =DNS2D::getBarcodePNGPath("http://www.baidu.com", "QRCODE",10,10);
        // echo '<img src="'.$test_code.' " />';
        //$test = geoip('120.239.179.109');
        $test = 0.1+0.2;
        dd($test);
    }
}
