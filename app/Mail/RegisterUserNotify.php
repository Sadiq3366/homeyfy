<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RegisterUserNotify extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    /**
     * Create a new message instance.
     */
    public function __construct($user,$recipientType)
    {
        $this->user = $user;
        $this->recipientType = $recipientType;

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New User Register',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        if ($this->recipientType == 'admin') {
            return new Content(
                view: 'emails.register_admin_notify',
                with: ['user' => $this->user]
            );
        } else {
            return new Content(
                view: 'emails.register_user_notify', // Update this path
                with: ['user' => $this->user] // Pass the user data to the view
            );
        }

    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
