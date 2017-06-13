import {Component, OnInit, Renderer, ViewChild} from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {StatusService} from "../auth/status.service";
declare const $;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{
  @ViewChild('groupChat')  groupChat;
  @ViewChild('#privateChatText') privateChatText;
  private socket;
  private name:string;
  private role:string;
  private users:Array<string>=[];
  private messages:any;

  constructor( private renderer:Renderer, private statusService:StatusService) {
    this.socket = io('http://localhost:3000');

    // ловим сообщение в общем чате
    this.socket.on('message', data=>{
      $('#messages').append('<li>'+data+'</li>');
    });

    // ловим изменение количества пользователей общего чата
    this.socket.on('usernames',  (data)=> {
      let html = '';
      this.users = data;
    });

    //ловим изменения количества пользователей приватного чата
    this.socket.on('privateUsernames',  (data)=> {
      this.groupChat.nativeElement.children[1].innerHTML='';
      data.forEach((user)=>{
        this.groupChat.nativeElement.children[1].innerHTML+='<li style="list-style: none">'+user+'</li>';
      });
    });

    // ловим сообщения в общем чате
    this.socket.on('conversation private post',(data)=>{
      this.groupChat.nativeElement.children[2].innerHTML+=data.message+'<br>';
    });

    // по получению сообщения создаем приватный чат
    this.socket.on('private',(data)=>{
      if (data.msg == 'create room'){
        this.createPrivateChat();
      }
    });

    // this.socket.on('private room create',function(data){
    //   console.log('+++++++'+data.msg);
    // });
  }

  ngAfterViewInit(){
    this.messages = document.getElementById('messages');
  }


  enterName(name){
    this.socket.emit('new user', this.name, function (data) {
      if (data){
        console.log('Yes');
      }else{
        console.log('No');
      }
    });
  }

  // отправка сообщений в общем чате
  send(msg) {
    if (msg != ''){
      msg = this.name+': ' + msg;
      this.socket.emit('message', msg);
      $('#m').val('');
      this.messages.scrollTop = 9999;
    }
  }

  // secretRoomEnter(){
  //   this.socket.emit('room', 'room');
  //   this.socket.on('for', function (data) {
  //     console.log(data);
  //   });
  // }

  // отправка сообщений в приватном чате
  privateRoomSendMessages(){
    let conversation_id = 13;
    this.socket.emit('subscribe', conversation_id);

    this.socket.emit('send message',{
      room: conversation_id,
      message:"Some message"});

    this.socket.emit("private", { msg: 'private message: '});
  }

  // доваление пользователя в приватный чат
  addUserToChat(user){
    console.log('hi from a');
    console.log(user);
    this.socket.emit("private", { to:user, msg: 'create room'});
    this.socket.emit("new private user", { master:this.name, user:user });
    this.createPrivateChat();
  }

  //создание приватного чата
  createPrivateChat(){
    this.renderer.setElementStyle(this.groupChat.nativeElement, 'visibility', 'visible');
    let conversation_id = 13;
    this.socket.emit('subscribe', conversation_id);
  }

  //закрытие приватного чата
  closePrivateChat(){
    this.renderer.setElementStyle(this.groupChat.nativeElement, 'visibility', 'hidden');
  }

  //отправка сообщений в приватном чате
  emitPrivateMessage(message){
    if (message!=''){
      this.socket.emit('send message',{
        room: 13,
        message:this.name + ' :  '+ message
      });
    }
  }


  ngOnInit(){
    this.name = this.statusService.getUserName();
    this.role = this.statusService.getStatus();
    if(this.name){
      this.enterName(this.name);
    }
    this.renderer.setElementStyle(this.groupChat.nativeElement, 'visibility', 'hidden');
    $('#m').css("color", "blue");
  }


}
