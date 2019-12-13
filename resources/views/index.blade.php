<!DOCTYPE html>
<html lang="{{config('app.locale')}}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{mix('css/app.css')}}">
    <title>智联仓储管理系统</title>
</head>

<body>
    <div id="app">
        <app-template></app-template>
    </div>
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
