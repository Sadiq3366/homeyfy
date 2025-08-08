<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeServiceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $serviceName = ucfirst($name) . 'Service';
        $path = app_path("Services/{$serviceName}.php");

        // Check if file already exists
        if (file_exists($path)) {
            $this->error("Service '{$serviceName}' already exists!");
            return;
        }

        // Create Services directory if not exists
        if (!file_exists(app_path('Services'))) {
            mkdir(app_path('Services'), 0755, true);
        }

        // Service class boilerplate
        $stub = <<<PHP
    <?php

    namespace App\Services;

    class {$serviceName}
    {
        //
    }
    PHP;

        file_put_contents($path, $stub);
        $this->info("Service '{$serviceName}' created successfully at: {$path}");
    }
}
