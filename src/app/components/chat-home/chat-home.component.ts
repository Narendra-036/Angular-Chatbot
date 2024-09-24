import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {

  userData: any = null;
  roomsData: any = null;
  errorMessage: string | null = null;
  dataLoaded: boolean = false;  // Flag to show the page only after data is loaded

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');

    if (!email) {
      localStorage.clear();
      this.router.navigate(['/login']);
      return;
    }

    this.authService.chathome(email).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.userData = response.user;
          this.roomsData = response.rooms;
          this.dataLoaded = true;  // Set to true once data is loaded
          console.log('User data', this.userData);
        } else {
          this.errorMessage = 'Invalid email or password';
          this.dataLoaded = true;  // Set to true even if there is an error to show the message
        }
      },
      (error) => {
        this.errorMessage = 'Something went wrong. Please try again.';
        this.dataLoaded = true;  // Set to true in case of error
      }
    );
  }

  startNewChat(): void {
    const email = localStorage.getItem('userEmail');
    console.log('Starting new chat with', email);
    if (!email) {
      this.errorMessage = 'User email not found';
      return;
    }

    this.authService.createNewChat(email).subscribe(
      (response) => {
        if (response.status === 'success') {
          console.log('New chat initiated', response);
          console.log('New chat room', response.room.room_data.slug);
          // Optionally, update the roomsData to include the new chat room
          // redirect to the chat room
          // chat/:slug
          // this.router.navigate(['/chat', response.room.room_data.slug]);
          this.router.navigate(['/chat/' + response.room.room_data.slug]);

        } else {
          this.errorMessage = 'Failed to initiate new chat';
        }
      },
      (error) => {
        this.errorMessage = 'Something went wrong while initiating new chat. Please try again.';
      }
    );
  }
}
