<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear 5 usuarios
        User::factory(5)->create();

        // Usuario para Testing
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'tests@example.com',
        ]);
    }
}
