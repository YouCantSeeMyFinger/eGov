package kr.member.mapper;

import org.apache.ibatis.annotations.Mapper;

import kr.board.user.Member;

@Mapper
public interface MemberMapper {

	public Member registerCheck(String memberId);

	public int registerMember(Member member);

	public Member memberLogin(Member member);

	public void memberUpdate(Member member);

	public Member getMember(String memberId);

	public void imageUpdate(Member member);
}
