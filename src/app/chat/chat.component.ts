import {Component, OnInit, Renderer, ViewChild} from '@angular/core';
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
  @ViewChild('groupChat')  groupChat;
  private socket;
  private name:string;
  private users:Array<string>=[];

  constructor( private renderer:Renderer) {
    this.socket = io('http://localhost:3000');

    const listener = Observable.fromEvent(this.socket, 'message');
    listener.subscribe((data) => {
      console.log(data);
      let str = '<li>'+data+'</li>';
      $('#messages').append( str);
    });

    this.socket.on('usernames',  (data)=> {
      console.log('userList');
      console.log(data);
      let html = '';
      this.users = data;
      // data.forEach(function (user) {
      //   html+='<a  #user class="user" href="#" id="' + user + '" (click)="f()">'+ user +'</a>'+'<br>';
      // });
      // $('#users').html('').append(html);
    });

    this.socket.on('conversation private post',function(data){
      console.log(data.message);
    });

    this.socket.on('private',(data)=>{
      console.log('+++++++'+data.msg);
      if (data.msg == 'create room'){
        this.createPrivateChat();
      }
    });

    this.socket.on('private room create',function(data){
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

    this.socket.emit("private", { msg: 'private message: '});
  }


  addUserToChat(user){
    console.log('hi from a');
    console.log(user);
    this.socket.emit("private", { to:user, msg: 'create room'});
    //this.socket.emit("private room create", { to:user, msg: 'private room: '});
    this.createPrivateChat();
  }

  createPrivateChat(){
    this.renderer.setElementStyle(this.groupChat.nativeElement, 'visibility', 'visible');
    let conversation_id = 13;
    this.socket.emit('subscribe', conversation_id);

    // this.socket.emit('send message',{
    //   room: conversation_id,
    //   message:"Some message"
    // });

  }


  ngOnInit(){
    console.log(this.groupChat.nativeElement);
    this.renderer.setElementStyle(this.groupChat.nativeElement, 'visibility', 'hidden');
    $('#m').css("color", "blue");
  }

  emitPrivateMessage(){
    this.socket.emit('send message',{
      room: 13,
      message:"Some message from : " +this.name
    });

  }


}
