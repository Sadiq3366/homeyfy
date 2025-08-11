<?php

namespace App\Providers;
use Laravel\Sanctum\Sanctum;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Carbon;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);

        // Expire tokens after 24 hours
        PersonalAccessToken::retrieved(function ($token) {
            if ($token->created_at->lt(Carbon::now()->subHours(24))) {
                $token->delete();
            }
        });
    }
}
