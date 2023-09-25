<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Client;
use Carbon\Carbon;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "client_id"=> Client::factory()->create()->id,
            "title"=> fake()->sentence(),
            "description"=> fake()->paragraph(),
            "date"=> fake()->dateTimeBetween('+0 days', '+1 month'),
            "start_time"=> $start = fake()->dateTimeBetween('+0 days', '+1 month'),
            "end_time"=> Carbon::parse($start)->addHours(2),
            "status"=> rand(1,3),
        ];
    }
}
