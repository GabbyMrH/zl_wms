<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //执行迁移文件
        //makeVisible 方法临时显示 User 模型里指定的隐藏属性 $hidden
        $users = factory(User::class)->times(50)->make();
        User::insert($users->makeVisible(['password', 'remember_token'])->toArray());

        $user = User::find(1);
        $user->name = 'gabby';
        $user->email = 'gabby@test.com';
        $user->save();
    }
}
