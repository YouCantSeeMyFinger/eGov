package kr.board.entity;

import lombok.Data;

// Domain
@Data
public class Board {
    // 번호
    private Integer idx;
    // 아이디
    private String memberId; 
    // 제목
    private String title;
    // 내용
    private String content;
    // 작성자
    private String writer;
    // 작성일
    private String indate;
    // 조회수
    private Integer count;
}
