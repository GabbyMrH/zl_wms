<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <title>Laravel Vue Element-Ui</title>
    @notifyCss
</head>
<body>
<div>



</div>
@include('notify::messages')
@notifyJs
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
