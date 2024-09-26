<!DOCTYPE html>
<html>
<head>
    <title>New User Registration</title>
</head>
<body>
<h1>Hello {{ $user->user_name }},</h1>
<p>Thank you for registering with us!</p>
<p>Your email address is: {{ $user->email }}</p>

</body>
</html>
