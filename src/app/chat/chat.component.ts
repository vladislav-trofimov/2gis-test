import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
declare const $;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  private socket;
  private name:string;
  constructor() {
    this.socket = io('http://localhost:3000');

    const listener = Observable.fromEvent(this.socket, 'message');
    listener.subscribe((data) => {
      console.log(data);
      let str = '<li>'+data+'</li>';
      $('#messages').append( str);
    });

    this.socket.on('usernames', function (data) {
      console.log('userList');
      console.log(data);
      let html = '';
      data.forEach(function (user) {
        html+=user+'...'+'<br>';
      });
      $('#users').html('').append(html);
    });

    this.socket.on('conversation private post',function(data){
      console.log(data.message);
    });

    this.socket.on('private',function(data){
      console.log('+++++++'+data.msg);
    });


  }

  enterName(name){
    console.log(name);
    console.log(this.name);
    this.socket.emit('new user', this.name, function (data) {
      if (data){
        console.log('Yes');
      }else{
        console.log('No');
      }
    });
  }

  send(msg) {
    msg = this.name+': ' + msg;
    this.socket.emit('message', msg);
    $('#messages').append('<li>'+ msg+'</li>');
    $('#m').val('');
  }

  secretRoomEnter(){
    this.socket.emit('room', 'room');
    this.socket.on('for', function (data) {
      console.log(data);
    });
  }

  privateRoomSendMessages(){
    let conversation_id = 13;
    this.socket.emit('subscribe', conversation_id);

    this.socket.emit('send message',{
      room: conversation_id,
      message:"Some message"});

    this.socket.emit("private", { msg: 'private message to Tom'});
  }

  ngOnInit(){
    $('#m').css("color", "blue");
  }
}
