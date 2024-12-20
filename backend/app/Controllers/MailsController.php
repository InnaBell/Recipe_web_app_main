<?php

namespace App\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class MailsController {
  function send(Request $request) {
    $subject = $request->input('subject');
    $content = $request->input('content');
    $to = $request->input('to');

    Mail::raw(
      $content,
      fn($mail) => $mail->to($to)->subject($subject),
    );

    return 'mail sent to: ' . $to;
  }
}
