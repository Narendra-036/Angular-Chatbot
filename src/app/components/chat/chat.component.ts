import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  replyText: string = '';
  chatData = null;
  slug: string | null = null;
  room: any = { name: '' }; // Room object to store room details like name

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.slug = this.router.url.split('/').pop() ?? null;

    console.log('Chat room slug:', this.slug);

    if (this.slug) {
      this.room.name = this.slug;
      this.fetchMessages(); // Fetch messages
    } else {
      console.error('No chat room identifier found.');
    }
  }

  

  fetchMessages(): void {
    if (this.slug) {
      this.authService.getChatMessages(this.slug)
        .subscribe(response => {
          if (response.status === 'success') {
            this.messages = response.messages;
            console.log('Fetched messages:', this.messages);
          } else {
            console.error('Error fetching messages:', response.message);
          }
        }, error => {
          console.error('Error fetching messages:', error);
        });
    }
  }

  sendMessage(): void {
    if (this.replyText.trim() && this.slug) {
      const userEmail = localStorage.getItem('userEmail');
      const userMessage = {
        message: this.replyText,
        user: userEmail,
        room: this.slug
      };

      // Add user message immediately
      this.messages.push(userMessage);

      // Add a temporary bot loading message
      const botLoadingMessage = {
        message: 'Loading...',
        user: 'bot_loading',
        room: this.slug
      };
      this.messages.push(botLoadingMessage);

      // Send message to the server
      this.authService.sendMessage(this.slug, this.replyText).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            // Update the loading message with the actual bot reply
            const botReply = {
              message: response.bot_reply,
              user: 'bot@angularbot.com',
              room: this.slug
            };
            
            // Find and replace the 'bot_loading' message
            const botLoadingIndex = this.messages.findIndex(msg => msg.user === 'bot_loading');
            if (botLoadingIndex > -1) {
              this.messages[botLoadingIndex] = botReply;
            }

            this.replyText = '';
          } else {
            console.error('Failed to send message', response.message);
          }
        },
        error => {
          console.error('Error sending message', error);
        }
      );
    }
  }
}
