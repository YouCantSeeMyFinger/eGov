package kr.member.mapper;

import org.apache.ibatis.annotations.Mapper;

import kr.board.user.Member;

@Mapper
public interface MemberMapper {

	public Member registerCheck(String memberId);

	public int registerMember(Member member);

}
